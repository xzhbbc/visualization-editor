import { widgetConfigList } from '@/pages/config/config'
import React from 'react'
import DraggableBox from '../draggableBox'
import './index.scss'

const Widgets = () => {
  return (
    <div className="widget">
      {widgetConfigList.map(item => (
        <DraggableBox key={item.name} item={item}>
          <div className="box">
            <img className="icon" src={item.icon} />
            <div>{item.name}</div>
          </div>
        </DraggableBox>
      ))}
    </div>
  )
}

export default React.memo(Widgets)
