import { createContext, ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { api } from './../lib/axios'
import { IPosts } from '../enum/types'

interface PostsContextType {
  posts: IPosts[]
  createPost: (data: CreatePostInput) => Promise<void>
  createComment: (data: CreateCommentInput) => Promise<void>
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

  const createComment = async (data: CreateCommentInput) => {
    const { content, postId } = data

    const newComment = {
      postId,
    }

    console.log(newComment)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostsContext.Provider value={{ posts, createPost, createComment }}>
      {children}
    </PostsContext.Provider>
  )
}
