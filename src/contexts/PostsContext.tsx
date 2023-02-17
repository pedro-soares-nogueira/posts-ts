import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useState } from 'react'
import { api } from './../lib/axios'
import { IComments, IPosts } from '../enum/types'
import { AuthContext } from './AuthContext'

interface PostsContextType {
  posts: IPosts[]
  comments: IComments[]
  createPost: (data: CreatePostInput) => Promise<void>
  createComment: (data: CreateCommentInput) => Promise<void>
  deleteComment: (id: number) => Promise<void>
}

interface PostsProviderProps {
  children: ReactNode
}

interface CreatePostInput {
  title: string
  content: string
}

interface CreateCommentInput {
  postId: number
  content: string
}

export const PostsContext = createContext({} as PostsContextType)

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<IPosts[]>([])
  const [comments, setComments] = useState<IComments[]>([])

  const fetchPosts = async () => {
    const response = await api.get('posts', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setPosts(response.data)
  }

  const createPost = async (data: CreatePostInput) => {
    const { content, title } = data

    const response = await api.post('posts', {
      title,
      content,
      createdAt: new Date(),
    })

    setPosts((state) => [response.data, ...posts])
  }

  const fetchComments = async () => {
    const response = await api.get('comments')

    setComments(response.data)
  }

  const createComment = async (data: CreateCommentInput) => {
    const { content, postId } = data
    const userId = sessionStorage.getItem('userId')

    const newComment = {
      postId,
      content,
      userId,
      createdAt: new Date(),
    }

    const response = await api.post('comments', newComment)

    setComments((state) => [response.data, ...comments])
  }

  const deleteComment = async (id: number) => {
    const response = await api.delete(`comments/${id}`)

    const commentWithoutDeletedOne = comments.filter((comment) => {
      return comment.id !== id
    })
    setComments(commentWithoutDeletedOne)
  }

  useEffect(() => {
    fetchPosts()
    fetchComments()
  }, [])

  return (
    <PostsContext.Provider
      value={{ posts, comments, createPost, createComment, deleteComment }}
    >
      {children}
    </PostsContext.Provider>
  )
}
