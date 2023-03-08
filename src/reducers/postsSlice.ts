import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IPosts } from '../enum/types'
import { api } from './../lib/axios'

export interface PostState {
  posts: IPosts[]
  loading: boolean
}

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('posts', {
    params: {
      _sort: 'createdAt',
      _order: 'desc',
    },
  })

  return response.data
})

const initialState = {
  posts: [],
  loading: false,
} as PostState

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
  },
})

export const {} = postsSlice.actions
export const postActios = { fetchPosts }
export default postsSlice.reducer
