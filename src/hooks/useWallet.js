import { useState, useCallback, useEffect } from 'react'
import { walletApi, transactionApi } from '../api'

export function useWallet(upiId) {
  const [wallet, setWallet]     = useState(null)
  const [txs, setTxs]           = useState([])
  const [loadingW, setLoadingW] = useState(true)
  const [loadingT, setLoadingT] = useState(true)

  const fetchWallet = useCallback(async () => {
    setLoadingW(true)
    try {
      const res = await walletApi.getBalance(upiId)
      if (res.success) setWallet(res.data)
    } catch (_) {}
    setLoadingW(false)
  }, [upiId])

  const fetchTxs = useCallback(async () => {
    setLoadingT(true)
    try {
      const res = await transactionApi.history(upiId)
      if (res.success) setTxs(Array.isArray(res.data) ? res.data : [])
    } catch (_) {}
    setLoadingT(false)
  }, [upiId])

  const refresh = useCallback(() => {
    fetchWallet()
    fetchTxs()
  }, [fetchWallet, fetchTxs])

  useEffect(() => { refresh() }, [refresh])

  return { wallet, txs, loadingW, loadingT, refresh }
}
