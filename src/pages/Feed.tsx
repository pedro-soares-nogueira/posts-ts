import Header from '../components/Header'
import Post from '../components/Post'
import SideBar from '../components/SideBar'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { PostsContext } from './../contexts/PostsContext'

const newPostFormSchema = z.object({
  content: z.string(),
})

type NewPostFormInputs = z.infer<typeof newPostFormSchema>

const Feed = () => {
  const { posts, createPost } = useContext(PostsContext)

  const { register, handleSubmit, reset } = useForm<NewPostFormInputs>()

  const handleCreateNewPost = async (data: NewPostFormInputs) => {
    const { content } = data

    await createPost({
      content,
    })

    reset()
  }

  return (
    <>
      <Header />
      <div className='max-w-[1100px] mx-4 lg:m-auto mt-8 lg:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 '>
        <div className='sticky top-8'>
          <SideBar />
        </div>
        <div className='md:col-span-2 space-y-8 mb-20'>
          {/* new post */}
          <form
            onSubmit={handleSubmit(handleCreateNewPost)}
            className='bg-zinc-800 rounded-md p-6 space-y-4'
          >
            <h1 className='text-lg font-bold'>Inicie uma publicação</h1>
            <textarea
              cols={30}
              rows={4}
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
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed
