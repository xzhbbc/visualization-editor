import { WidgetConfig } from '@/pages/config/config'
import { DRAGGABLE_KEY } from '@/pages/config/constans'
import React, { ReactNode } from 'react'
import { useDrag } from 'react-dnd'

type IProps = {
  children: ReactNode
  item: WidgetConfig
}

const DraggableBox: React.FC<IProps> = ({ children, item }) => {
  // @ts-ignore
  const [{ isDragging }, drag] = useDrag({
    type: DRAGGABLE_KEY,
    item
  })
  console.log(isDragging, '拖拽中====')
  return <div ref={drag}>{children}</div>
}

export default DraggableBox
