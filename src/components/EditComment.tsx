import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { PostsContext } from './../contexts/PostsContext'
import { useContext } from 'react'

interface CommentProps {
  id: number
  content: string
}

const newCommentFormSchema = z.object({
  id: z.number(),
  content: z.string(),
})

type NewCommentFormInputs = z.infer<typeof newCommentFormSchema>

const EditComment = ({ id, content }: CommentProps) => {
  const { editComment } = useContext(PostsContext)
  const { register, handleSubmit, reset } = useForm<NewCommentFormInputs>({
    defaultValues: {
      content,
    },
  })

  const onSubmitComment = async (data: NewCommentFormInputs) => {
    const { content } = data
    const actualComment = {
      id,
      content,
    }
    editComment(actualComment)

    reset()
  }

  return (
    <div>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-black opacity-70' />

        <Dialog.Content
          className='bg-zinc-800'
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className='flex items-center justify-between px-6 pt-6'>
            <Dialog.Title>Editar comentário</Dialog.Title>

            <Dialog.Close>
              <X size={24} />
            </Dialog.Close>
          </div>

          <form
            onSubmit={handleSubmit(onSubmitComment)}
            className=' rounded-md p-6 space-y-4'
          >
            <textarea
              cols={30}
              rows={4}
              {...register('content')}
              required
              className='bg-zinc-900 rounded-md border border-gray-600 p-4 font-semibold 
                 w-full outline-none focus:border-purple-400 transition-all'
            ></textarea>

            <button
              type='submit'
              title=''
              className='py-3 px-4 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
                            transition-all disabled:opacity-25'
            >
              Editar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </div>
  )
}

export default EditComment
