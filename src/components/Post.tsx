import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Comment from './Comment'
import Avatar from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'
import { Trash } from 'phosphor-react'
import { IPosts } from '../enum/types'

interface UserProps {
  name: string
  avatarUrl: string
  role: string
}

const Post = ({ id, title, content, userId, comments }: IPosts) => {
  const [user, setUser] = useState<UserProps[]>([])

  useEffect(() => {
    fetch(`http://localhost:3000/users?id=${userId}`)
      .then((res) => res.json())
      .then((res) => setUser(res))
  }, [id])

  console.log(comments)

  return (
    <article className='bg-zinc-800 rounded-md p-6 space-y-5'>
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
              <span className='block text-base text-gray-300'>{user.role}</span>
            </div>
          </div>
        )
      })}
      <div className='space-y-5'>
        <h2 className='block text-2xl font-bold text-gray-200'>{title}</h2>
        <span className='block text-base text-gray-300'>{content}</span>
      </div>

      {comments?.map((comment) => {
        return (
          <div
            key={comment.id}
            className='bg-gray-900 rounded-lg p-4 flex items-start justify-center gap-5'
          >
            <p className=''>{comment.content}</p>
            <Trash
              size={42}
              className='text-gray-200 hover:text-red-400 transition-all cursor-pointer'
            />
          </div>
        )
      })}
    </article>
  )
}

export default Post
