import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { IPosts } from '../enum/types'
import { api } from './../lib/axios'

export interface PostState {
  posts: IPosts[]
  loading: boolean
}

interface CreatePostInput {
  title: string
  content: string
  userId: number
}

const initialState = {
  posts: [],
  loading: false,
} as PostState

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('posts', {
    params: {
      _sort: 'createdAt',
      _order: 'desc',
    },
  })

  return response.data
})

const createPost = createAsyncThunk(
  'posts/createPost',
  async (data: CreatePostInput) => {
    const { content, title, userId } = data

    const response = await api.post('posts', {
      title,
      content,
      createdAt: new Date(),
      userId,
    })

    return response.data
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.loading = false
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      console.log('aqui extra reducer - rejected')
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts]
      state.loading = false
    })
    builder.addCase(createPost.rejected, (state, action) => {
      console.log('aqui extra reducer - rejected')
    })
  },
})

export const {} = postsSlice.actions
export const postActios = { fetchPosts, createPost }
export default postsSlice.reducer
