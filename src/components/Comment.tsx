import { useContext, useEffect, useState } from 'react'
import { PostsContext } from '../contexts/PostsContext'
import EditComment from './EditComment'
import * as Dialog from '@radix-ui/react-dialog'
import { PencilSimpleLine, Trash } from 'phosphor-react'
import { IUser } from '../enum/types'
import { formatDistanceToNow, parseISO } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'

interface CommentProps {
  id: number
  content: string
  createdAt: string
}

const Comment = ({ id, content, createdAt }: CommentProps) => {
  const { deleteComment } = useContext(PostsContext)

  const hadleDeleteComment = (id: number) => {
    deleteComment(id)
  }

  const publishedDateRelativeToNow = formatDistanceToNow(parseISO(createdAt), {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <div className='bg-gray-900 rounded-lg p-4 flex items-start justify-between gap-5'>
      <p className='flex-1'>{content}</p>
      <div className='flex flex-col items-end justify-center gap-2'>
        <span className='text-xs'>{publishedDateRelativeToNow}</span>
        <div className='flex items-center justify-center gap-2'>
          <Dialog.Root>
            <Dialog.Trigger>
              <PencilSimpleLine
                size={22}
                className='text-gray-200 hover:text-green-400 transition-all cursor-pointer'
              />
            </Dialog.Trigger>
            <EditComment id={id} content={content} />
          </Dialog.Root>
          <button
            onClick={() => hadleDeleteComment(id)}
            title='Deletar comentário'
          >
            <Trash
              size={22}
              className='text-gray-200 hover:text-red-400 transition-all cursor-pointer'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment
