import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { createContext, useMemo, useState } from 'react'
import { PhoneLookupResult } from '@/interfaces'
import Layout from '../components/layout/Layout'

interface IHistoryContext {
  history: { areaCode: string; phone: string; result: PhoneLookupResult }[]
  setHistory: (action: any) => void
}

export const HistoryContext = createContext<IHistoryContext>(
  {} as IHistoryContext,
)

export default function App({ Component, pageProps }: AppProps) {
  const [history, setHistory] = useState([])
  const historyContextValue = useMemo(
    () => ({ history, setHistory }),
    [history],
  )

  return (
    <HistoryContext.Provider value={historyContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HistoryContext.Provider>
  )
}
