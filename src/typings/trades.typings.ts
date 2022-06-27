import { INote } from './notes.typings'

type TradeTypes = 'Spot' | 'Futures' | 'Margin' | 'Holdings'
type TradeBS = 'Long' | 'Short' | 'Buy' | 'Sell'

export interface ITrade {
  id?: string
  datetime?: Date
  ticker: string
  type: TradeTypes
  trade: TradeBS
  size: string
  leverage: string
  entry: string
  exit: string
  pnl: string
  notes: INote[] | []
  userId: string
}

export interface ITradeInput {
  data: {
    ticker: string
    trade: TradeBS
    size: number
    entry: number
    exit: number
    leverage: number
    notes: string
    type: TradeTypes
  }
}
