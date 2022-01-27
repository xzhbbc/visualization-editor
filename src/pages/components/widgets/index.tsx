import React from 'react'
import { useDrag } from 'react-dnd'
import Tips from '@/pages/components/tips'
export type DragItemType = {
  type: string
  components: React.MemoExoticComponent<() => JSX.Element>
}

const Widgets = () => {
  const [, drag] = useDrag({
    type: 'Box',
    item: { type: 'Box', components: Tips } as DragItemType
  })

  return <div ref={drag}>可拖拽 box</div>
}

export default React.memo(Widgets)
