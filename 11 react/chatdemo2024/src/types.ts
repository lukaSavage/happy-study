import { ReactNode } from 'react'

export enum Role {
  ASSISTANT = 'assistant',
  USER = 'user'
}

export interface Msg {
  role: Role
  content: ReactNode
}
