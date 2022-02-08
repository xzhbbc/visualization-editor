import { widgetConfigList } from '@/pages/config/config'
import React from 'react'
import DraggableBox from '../draggableBox'

const Widgets = () => {
  return (
    <div>
      {widgetConfigList.map(item => (
        <DraggableBox item={item}>
          <div>{item.name}</div>
        </DraggableBox>
      ))}
    </div>
  )
}

export default React.memo(Widgets)
