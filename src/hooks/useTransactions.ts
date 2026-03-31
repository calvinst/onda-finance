import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { fetchTransactions, fetchAccount } from '@/services/transactionService'
import { useAccountStore } from '@/store/accountStore'

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })
}

export function useAccount() {
  const setBalance = useAccountStore((s) => s.setBalance)

  const query = useQuery({
    queryKey: ['account'],
    queryFn: fetchAccount,
  })

  useEffect(() => {
    if (query.data) {
      setBalance(query.data.balance)
    }
  }, [query.data, setBalance])

  return query
}