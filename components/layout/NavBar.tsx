import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './NavBar.module.css'

function NavBar(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [isDarkMode])

  return (
    <nav className={styles.nav}>
      <div className={cn('mr-auto', styles.linkWrapper)}>
        <Link href="/">Validation</Link>
        <Link href="/history">History</Link>
      </div>
      <button
        className={cn(styles.toggle, { 'flex-row-reverse': isDarkMode })}
        type="button"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        <span>{isDarkMode ? '🌝' : '🌞'}</span>
        <span>Theme</span>
      </button>
    </nav>
  )
}

export default NavBar
