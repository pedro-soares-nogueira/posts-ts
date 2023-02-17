import { createContext, ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { api } from './../lib/axios'

interface Posts {
  id: number
  title: string
  content: string
  userId: number
}

interface PostsContextType {
  posts: Posts[]
  createPost: (data: CreatePostInput) => Promise<void>
}

interface PostsProviderProps {
  children: ReactNode
}

interface CreatePostInput {
  content: string
}

export const PostsContext = createContext({} as PostsContextType)

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Posts[]>([])

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
    const { content } = data

    const response = await api.post('posts', {
      content,
      createdAt: new Date(),
    })

    setPosts((state) => [response.data, ...posts])
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostsContext.Provider value={{ posts, createPost }}>
      {children}
    </PostsContext.Provider>
  )
}