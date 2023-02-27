import React, { useContext } from 'react'
import { HistoryContext } from '@/pages/_app'
import { useRouter } from 'next/router'
import ContentWrapper from '@/components/layout/ContentWrapper'
import headerImg from '../public/history_background.webp'
import styles from './History.module.css'

export default function History(): JSX.Element {
  const router = useRouter()
  const { history } = useContext(HistoryContext)

  return (
    <ContentWrapper headerImg={headerImg}>
      <div className={styles.grid}>
        <h1 className="text-5xl mb-4">History</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Area code</th>
                <th>Phone number</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {[...history].reverse().map((it, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={index}>
                  <td>{it.areaCode}</td>
                  <td>{it.phone}</td>
                  <td className="break-all">{JSON.stringify(it.result)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="hover:underline"
          type="button"
          onClick={() => router.back()}
        >
          ← Back
        </button>
      </div>
    </ContentWrapper>
  )
}
