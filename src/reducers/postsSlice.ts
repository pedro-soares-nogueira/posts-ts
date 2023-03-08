import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IPosts } from '../enum/types'
import { api } from './../lib/axios'

export interface PostState {
  posts: IPosts[]
  loading: boolean
}

interface PostInput {
  id?: number
  title: string
  content: string
  userId: number | undefined
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
  async (data: PostInput) => {
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

const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ id, title, content, userId }: PostInput) => {
    const response = await api.put(`posts/${id}`, {
      title,
      content,
      createdAt: new Date(),
      userId,
    })
    return response.data
  }
)

const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
  const response = await api.delete(`posts/${id}`)
  return id
})

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
    builder.addCase(fetchPosts.rejected, () => {
      console.log('aqui extra reducer - rejected')
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts]
      state.loading = false
    })
    builder.addCase(createPost.rejected, () => {
      console.log('aqui extra reducer - rejected')
    })
    builder.addCase(editPost.fulfilled, (state, action) => {
      const newArray = state.posts.filter((post) => {
        return post.id !== action.payload.id
      })

      state.posts = [action.payload, ...newArray]
      state.loading = false
    })
    builder.addCase(editPost.rejected, () => {
      console.log('aqui extra reducer - rejected')
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const postWithoutDeletedOne = state.posts.filter((post) => {
        return post.id !== action.payload
      })

      state.posts = [...postWithoutDeletedOne]
      state.loading = false
    })
    builder.addCase(deletePost.rejected, () => {
      console.log('aqui extra reducer - rejected')
    })
  },
})

export const {} = postsSlice.actions
export const postActios = { fetchPosts, createPost, editPost, deletePost }
export default postsSlice.reducer
