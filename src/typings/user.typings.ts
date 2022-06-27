import { ITrade } from './trades.typings'

export interface IUser {
  id: string
  username: string
  email: string
  fullName: string
  profilePic: string
  balance: number | 0
  numOfTrades: number | 0
  numOfWins: number |0
  accuracy: number | 0
  totalPnL: number | 0
  pnlPercentage: number
  trades: any
}

export interface ISignupInput {
  data: {
    username: string
    password: string
    email: string
    fullName: string
  }
}

export interface ILoginInput {
  data: {
    username: string
    password: string
  }
}
