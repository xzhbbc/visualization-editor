import React, { useState } from 'react'
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetMonitor,
  useDrag,
  useDragDropManager,
  useDrop
} from 'react-dnd'
import { DragItemType } from '@/pages/components/widgets'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const type = 'Box'

const List = (props: { connectDropTarget: ConnectDropTarget }) => {
  const { connectDropTarget } = props
  return connectDropTarget(<div>123</div>)
}

const DndList = DropTarget(type, {}, connect => ({
  connectDropTarget: connect.dropTarget()
}))(List)

const Viewer = () => {
  const [componentList, setComponentList] = useState<DragItemType[]>([])
  // const [collectProps, dropViewer] = useDrop({
  //   // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
  //   accept: 'Box',
  //   // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
  //   collect: (minoter: DropTargetMonitor) => ({
  //     isOver: minoter.isOver()
  //   }),
  //   hover: e => {
  //     console.log(e, 'hover')
  //   },
  //   drop: (e: any, ac) => {
  //     const components = [...componentList]
  //     const componentMsg = e as DragItemType
  //     if (e.components) {
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       components.push(e)
  //       setComponentList(components)
  //     }
  //     console.log(e, 'drop')
  //   }
  // })
  // const [, drag] = useDrag({
  //   type: 'Viewer',
  //   item: componentList
  // })
  const dragDropManager = useDragDropManager()
  // const content = collectProps.isOver
  //   ? '快松开，放到碗里来'
  //   : '将 Box 组件拖动到这里'

  const dragEnd = result => {
    console.log(result)
  }

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="Box">
        {(provided, snapshot) => (
          <div
            //provided.droppableProps应用的相同元素.
            {...provided.droppableProps}
            // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
            ref={provided.innerRef}>
            {componentList.map((item, i) => (
              <item.components key={i} />
            ))}
          </div>
        )}
      </Droppable>
      {/*<div ref={dropViewer}>*/}
      {/*  <div ref={drag}>*/}
      {/*    {componentList.map((item, i) => (*/}
      {/*      <item.components key={i} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*  /!*{content}*!/*/}
      {/*</div>*/}
    </DragDropContext>
  )
}

export default React.memo(Viewer)
