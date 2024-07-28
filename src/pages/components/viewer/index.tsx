import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetMonitor,
  useDrag,
  useDragDropManager,
  useDrop
} from 'react-dnd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styles from './index.scss'
import { DRAGGABLE_KEY } from '@/pages/config/constans'
import { EmptyConfig, WidgetConfig } from '@/pages/config/config'
import { useDispatch, useSelector } from 'react-redux'
import { ModelData } from '@/pages/models/model'
import _ from 'lodash'

const type = 'Box'

const List = (props: { connectDropTarget: ConnectDropTarget }) => {
  const { connectDropTarget } = props
  return connectDropTarget(<div>123</div>)
}

const DndList = DropTarget(type, {}, connect => ({
  connectDropTarget: connect.dropTarget()
}))(List)
const Viewer = () => {
  const dispatchData = useDispatch()
  const domRef = useRef<any>()
  const operation = useRef<number>()
  const [hoverIndex, setHoverIndex] = useState<number>(-1)
  const editorModel = useSelector((store: ModelData) => store.editor)
  const [componentList, setComponentList] = useState<WidgetConfig[]>([])

  const hoverCallback = (e: any, ac: DropTargetMonitor) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const offset = ac.getClientOffset()
    if (offset) {
      const y = offset.y
      // console.log(e, 'hover-add', offset)
      if (editorModel.widgetData.length > 0) {
        let sumY = 0
        const firstHeight = editorModel.widgetData[0].height || 0
        if (y < firstHeight) {
          setHoverIndex(0)
          operation.current = 0
          return
        }
        for (let i = 0; i < editorModel.widgetData.length; i++) {
          const item = editorModel.widgetData[i]
          sumY += item.height || 0
          if (sumY > y) {
            // console.log(sumY, 'cal-add', i, y, editorModel.widgetData)
            operation.current = i
            setHoverIndex(i)
            break
          }
        }
        // 可能是最后个的情况
        if (sumY < y) {
          // console.log('最后一个', y)
          setHoverIndex(editorModel.widgetData.length)
          operation.current = editorModel.widgetData.length
        }
      } else {
        setHoverIndex(0)
        operation.current = 0
      }
    }
  }

  const [collectProps, dropViewer] = useDrop({
    // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    accept: DRAGGABLE_KEY,
    // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
    collect: (monitor: DropTargetMonitor) => {
      if (
        !monitor.getDropResult() &&
        !monitor.isOver() &&
        editorModel.type == 'IDLE'
      ) {
        operation.current = -1
        setHoverIndex(-1)
      }
      return {
        isOver: monitor.isOver()
      }
    },
    // hover: _.debounce(hoverCallback, 300),
    hover: hoverCallback,
    drop: (e: any, ac) => {
      const components = [...componentList]
      const componentMsg = e as WidgetConfig
      if (e.component) {
        dispatchData({
          type: 'editor/addWidget',
          widget: e,
          addIndex: operation.current
        })
        operation.current = -1
        setHoverIndex(-1)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        components.push(e)
        setComponentList(components)
      }
      // console.log(e, 'drop')
    }
  })
  // const [, drag] = useDrag({
  //   type: 'Viewer',
  //   item: componentList
  // })
  // console.log(collectProps, 'collectProps===')
  // const dragDropManager = useDragDropManager()
  const content = collectProps.isOver
    ? '快松开，放到碗里来'
    : '将 Box 组件拖动到这里'

  const dragEnd = (result: any) => {
    console.log(result)
    const { source, destination } = result
    if (!destination) return
    dispatchData({
      type: 'editor/moveWidget',
      index: source.index,
      moveIndex: destination.index
    })
  }

  useEffect(() => {
    domRef.current = domRef.current
      ? domRef.current
      : document.querySelector('#dropViewer')
    if (
      domRef.current &&
      editorModel.widgetData.length > 0 &&
      editorModel.type == 'ADD'
    ) {
      const height =
        domRef.current.children[0].children[editorModel.currentIndex]
          .clientHeight
      console.log(height, editorModel.currentIndex)
      dispatchData({
        type: 'editor/setWidgetHeight',
        index: editorModel.currentIndex,
        height
      })
      // console.log(
      //   domRef.current.children[0].children[0].clientHeight,
      //   'doms===='
      // )
    }
  }, [editorModel.widgetData])

  const widgetData = useMemo(() => {
    const data = [...editorModel.widgetData]
    console.log('widgetList在刷新add', hoverIndex)
    if (hoverIndex > -1) {
      data.splice(hoverIndex, 0, {
        ...EmptyConfig,
        id: 'empty-id'
      })
    }
    return data
  }, [editorModel.widgetData, hoverIndex])

  return (
    <div className={styles.viewer}>
      <div className={styles.container} id="dropViewer" ref={dropViewer}>
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId={DRAGGABLE_KEY}>
            {provided => (
              <div
                //provided.droppableProps应用的相同元素.
                {...provided.droppableProps}
                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                ref={provided.innerRef}
              >
                {widgetData.map((item, i) => (
                  <Draggable draggableId={item.id} index={i} key={item.id}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // className={renderClass(name)}
                        // onClick={setCurrentWidget}
                      >
                        <>
                          <item.component key={item.id} {...item.config} />
                        </>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {content}
      </div>
    </div>
  )
}

export default React.memo(Viewer)
