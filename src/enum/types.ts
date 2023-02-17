export interface IPosts {
  id: number
  title: string
  content: string
  userId: number
}
export interface IComments {
  id: number
  content: string
  createdAt: string
  userId: string
  postId: number
}
