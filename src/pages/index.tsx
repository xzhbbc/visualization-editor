import React from 'react'
import styles from './index.scss'
import Viewer from '@/pages/components/viewer'
import Widgets from '@/pages/components/widgets'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function IndexPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <div className={styles.left}>
          <Widgets />
        </div>
        <div className={styles.center}>
          <Viewer />
        </div>
        <div className={styles.right}></div>
      </div>
    </DndProvider>
  )
}
