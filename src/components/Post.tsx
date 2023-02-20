import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import Avatar from './Avatar'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'
import { PencilSimpleLine, Trash } from 'phosphor-react'
import { IPosts, IUser } from '../enum/types'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { PostsContext } from '../contexts/PostsContext'
import * as Dialog from '@radix-ui/react-dialog'
import NewPost from './NewPost'
import EditComment from './EditComment'
import Comment from './Comment'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

const newCommentSchema = z.object({
  id: z.number(),
  content: z.string(),
})

type NewCommnetInputs = z.infer<typeof newCommentSchema>

const Post = ({ id, title, content, userId, createdAt }: IPosts) => {
  const { createComment, comments, deletePost } = useContext(PostsContext)
  const [user, setUser] = useState<IUser[]>([])

  const { register, handleSubmit, reset } = useForm<NewCommnetInputs>()

  const publishedDateFormatted = format(parseISO(createdAt), "d 'de' LLLL", {
    locale: ptBR,
  })

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
              className='flex flex-col md:flex-row items-center justify-start gap-6'
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
        <div className='flex flex-col md:flex-row items-center justify-center gap-3'>
          <span className='text-xs'>{publishedDateFormatted}</span>

          <div className='flex items-center justify-center gap-3'>
            <Dialog.Root>
              <Dialog.Trigger>
                <PencilSimpleLine
                  size={22}
                  className='text-gray-200 hover:text-purple-400 transition-all cursor-pointer'
                />
              </Dialog.Trigger>

              <NewPost
                id={id}
                title={title}
                content={content}
                userId={userId}
              />
            </Dialog.Root>

            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <Trash
                  size={22}
                  className='text-gray-200 hover:text-red-400 transition-all cursor-pointer'
                />
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className='fixed w-screen h-screen inset-0 bg-black opacity-70' />
                <AlertDialog.Content
                  className='bg-zinc-800 p-4 rounded-md flex flex-col items-start justify-center gap-10'
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div>
                    <AlertDialog.Title>Excluir postagem</AlertDialog.Title>
                    <AlertDialog.Description className='text-2xl font-bold'>
                      Deseja Excluir a postagem?
                    </AlertDialog.Description>
                  </div>

                  <div className='w-full flex items-start justify-start gap-4'>
                    <AlertDialog.Cancel
                      className='py-3 px-4 flex items-center justify-center gap-2 font-bold text-purple-400 
                   rounded-lg transition-all hover:text-white'
                    >
                      Sair
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        onClick={() => hadleDeletePost(id)}
                        title='Alterar comentário'
                        className='py-3 px-4 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
                                  transition-all disabled:opacity-25'
                      >
                        Excluir
                      </button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
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
            w-full outline-none focus:border-purple-400 transition-all'
        ></textarea>

        <footer className='invisible max-h-0 group-focus-within:visible group-focus-within:max-h-32 transition-all'>
          <button
            type='submit'
            title=''
            className='py-4 px-6 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
            transition-all disabled:opacity-25'
          >
            Publicar
          </button>
        </footer>
      </form>

      {filteredComments?.map((comment) => {
        return <Comment key={comment.id} {...comment} />
      })}
    </article>
  )
}

export default Post
