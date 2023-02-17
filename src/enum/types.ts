export interface IPosts {
    id: number
    title: string
    content: string
    userId: number
    comments: { id: number; content: string; userId: number }[]
  }