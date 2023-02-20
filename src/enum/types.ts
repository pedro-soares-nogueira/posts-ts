export interface IPosts {
  id: number
  title: string
  content: string
  userId: number
  createdAt: string
}
export interface IComments {
  id: number
  content: string
  createdAt: string
  userId: string
  postId: number
}

export interface IUser {
  name: string
  username: string
  password: string
  avatarUrl: string
  role: string
}
