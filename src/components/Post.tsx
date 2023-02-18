import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import Comment from './Comment'
import Avatar from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'
import { PencilSimpleLine, Trash } from 'phosphor-react'
import { IPosts } from '../enum/types'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { PostsContext } from '../contexts/PostsContext'
import * as Dialog from '@radix-ui/react-dialog'
import NewPost from './NewPost'
import EditComment from './EditComment'

interface UserProps {
  name: string
  avatarUrl: string
  role: string
}

const newCommentSchema = z.object({
  id: z.number(),
  content: z.string(),
})

type NewCommnetInputs = z.infer<typeof newCommentSchema>

const Post = ({ id, title, content, userId }: IPosts) => {
  const { createComment, comments, deleteComment, deletePost } =
    useContext(PostsContext)
  const [user, setUser] = useState<UserProps[]>([])

  const { register, handleSubmit, reset } = useForm<NewCommnetInputs>()

  useEffect(() => {
    fetch(`http://localhost:3000/users?id=${userId}`)
      .then((res) => res.json())
      .then((res) => setUser(res))
  }, [id])

  const handleNewComment = (data: NewCommnetInputs) => {
    const { content } = data

    const newComment = {
      postId: id,
      content,
    }

    createComment(newComment)
    reset()
  }

  const filteredComments = comments.filter((comment) => comment.postId === id)

  const hadleDeleteComment = (id: number) => {
    deleteComment(id)
  }

  const hadleDeletePost = (id: number) => {
    deletePost(id)
  }

  return (
    <article className='bg-zinc-800 rounded-md p-6 space-y-5'>
      <div className='flex items-center justify-between'>
        {user.map((user) => {
          return (
            <div
              key={user.name}
              className='flex items-center justify-start gap-6'
            >
              <Avatar src={user.avatarUrl} />
              <div className='flex flex-col items-start justify-center'>
                <h2 className='block text-lg font-bold text-gray-200'>
                  {user.name}
                </h2>
                <span className='block text-base text-gray-300'>
                  {user.role}
                </span>
              </div>
            </div>
          )
        })}
        <div className='flex items-center justify-center gap-3'>
          <Dialog.Root>
            <Dialog.Trigger>
              <PencilSimpleLine
                size={22}
                className='text-gray-200 hover:text-green-400 transition-all cursor-pointer'
              />
            </Dialog.Trigger>

            <NewPost id={id} title={title} content={content} userId={userId} />
          </Dialog.Root>
          <button
            onClick={() => hadleDeletePost(id)}
            title='Alterar comentário'
          >
            <Trash
              size={22}
              className='text-gray-200 hover:text-red-400 transition-all cursor-pointer'
            />
          </button>
        </div>
      </div>

      <div className='space-y-5'>
        <h2 className='block text-2xl font-bold text-gray-200'>{title}</h2>
        <span className='block text-base text-gray-300'>{content}</span>
      </div>

      <form
        onSubmit={handleSubmit(handleNewComment)}
        className='border-t border-gray-500 flex flex-col items-start gap-3 py-4 group overflow-hidden'
      >
        <textarea
          cols={30}
          rows={4}
          placeholder='Coloque seu comentário'
          required
          {...register('content')}
          className='bg-zinc-900 rounded-md border border-gray-600 p-4 font-semibold 
            w-full outline-none focus:border-green-400 transition-all'
        ></textarea>

        <footer className='invisible max-h-0 group-focus-within:visible group-focus-within:max-h-32 transition-all'>
          <button
            type='submit'
            title=''
            className='py-4 px-6 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
            transition-all disabled:opacity-25'
          >
            Publicar
          </button>
        </footer>
      </form>

      {filteredComments?.map((comment) => {
        return (
          <div
            key={comment.id}
            className='bg-gray-900 rounded-lg p-4 flex items-center justify-between gap-5'
          >
            <p className='flex-1'>{comment.content}</p>

            <Dialog.Root>
              <Dialog.Trigger>
                <PencilSimpleLine
                  size={22}
                  className='text-gray-200 hover:text-green-400 transition-all cursor-pointer'
                />
              </Dialog.Trigger>
              <EditComment id={comment.id} content={comment.content} />
            </Dialog.Root>

            <button
              onClick={() => hadleDeleteComment(comment.id)}
              title='Deletar comentário'
            >
              <Trash
                size={22}
                className='text-gray-200 hover:text-red-400 transition-all cursor-pointer'
              />
            </button>
          </div>
        )
      })}
    </article>
  )
}

export default Post
