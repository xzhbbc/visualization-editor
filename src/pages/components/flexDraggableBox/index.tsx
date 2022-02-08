import React from 'react'
import styles from './styles.scss'

const FlexDraggableBox = () => {
  return (
    <div className={styles.flexBox}>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div>
  )
}

export default React.memo(FlexDraggableBox)
