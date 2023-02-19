import { useContext, useEffect, useState } from 'react'
import { PostsContext } from '../contexts/PostsContext'
import EditComment from './EditComment'
import * as Dialog from '@radix-ui/react-dialog'
import { PencilSimpleLine, Trash } from 'phosphor-react'
import { IUser } from '../enum/types'

interface CommentProps {
  id: number
  content: string
  userId: string
}

const Comment = ({ id, content, userId }: CommentProps) => {
  const { deleteComment } = useContext(PostsContext)

  const hadleDeleteComment = (id: number) => {
    deleteComment(id)
  }

  return (
    <div className='bg-gray-900 rounded-lg p-4 flex items-center justify-between gap-5'>
      <p className='flex-1'>{content}</p>
      <Dialog.Root>
        <Dialog.Trigger>
          <PencilSimpleLine
            size={22}
            className='text-gray-200 hover:text-green-400 transition-all cursor-pointer'
          />
        </Dialog.Trigger>
        <EditComment id={id} content={content} />
      </Dialog.Root>
      <button onClick={() => hadleDeleteComment(id)} title='Deletar comentário'>
        <Trash
          size={22}
          className='text-gray-200 hover:text-red-400 transition-all cursor-pointer'
        />
      </button>
    </div>
  )
}

export default Comment
