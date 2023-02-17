import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { PostsContext } from '../contexts/PostsContext'
import * as z from 'zod'

const newPostFormSchema = z.object({
  title: z.string(),
  content: z.string(),
})

type NewPostFormInputs = z.infer<typeof newPostFormSchema>

const NewPost = () => {
  const { createPost } = useContext(PostsContext)

  const { register, handleSubmit, reset } = useForm<NewPostFormInputs>()

  const handleCreateNewPost = async (data: NewPostFormInputs) => {
    const { content, title } = data

    await createPost({
      title,
      content,
    })

    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(handleCreateNewPost)}
      className='bg-zinc-800 rounded-md p-6 space-y-4'
    >
      <h1 className='text-lg font-bold'>Inicie uma publicação</h1>
      <input
        type='text'
        placeholder='Título'
        {...register('title')}
        required
        className='bg-zinc-900 rounded-md border border-gray-600 px-4 py-2 font-semibold 
                       w-full outline-none focus:border-green-400 transition-all'
      />
      <textarea
        cols={30}
        rows={4}
        placeholder='O que temos para hoje?'
        {...register('content')}
        required
        className='bg-zinc-900 rounded-md border border-gray-600 p-4 font-semibold 
                 w-full outline-none focus:border-green-400 transition-all'
      ></textarea>

      <button
        type='submit'
        title=''
        className='py-3 px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
    transition-all disabled:opacity-25'
      >
        Publicar
      </button>
    </form>
  )
}

export default NewPost
