import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from '../services/api'

type Transaction = {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get('transactions')
      .then((response) => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transaction: TransactionInput) {
    const response = await api.post('transactions', {
      ...transaction,
      createdAt: new Date()
    })

    setTransactions([...transactions, response.data.transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  return useContext(TransactionsContext)
}
