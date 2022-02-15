import React from 'react'
import styles from './index.scss'

const EmptyView = () => {
  return <div className={styles.empty} />
}

export default React.memo(EmptyView)
