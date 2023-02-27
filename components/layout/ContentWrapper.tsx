import Image, { ImageProps } from 'next/image'
import React from 'react'
import cn from 'classnames'
import styles from './ContentWrapper.module.css'

interface ContentWrapperProps {
  headerImg: ImageProps['src']
  children: React.ReactNode
}

function ContentWrapper({
  headerImg,
  children,
}: ContentWrapperProps): JSX.Element {
  return (
    <main className={cn('relative', styles.grid)}>
      <Image className={styles.headerImg} src={headerImg} alt="header-image" />
      <div className={styles.content}>
        <div>{children}</div>
      </div>
    </main>
  )
}

export default ContentWrapper
