import { Pen } from 'phosphor-react'
import React from 'react'
import Avatar from './Avatar'
import { useContext } from 'react'
import { PostsContext } from './../contexts/PostsContext'
import { AuthContext } from './../contexts/AuthContext';

interface UserProps {
  id: number
  name: string
  avatarUrl: string
  role: string
}

const SideBar = () => {
  const {user} = useContext(AuthContext)

  console.log(user)

  return (
    <div className='rounded-lg overflow-hidden bg-zinc-800'>
      <img
        className='w-full h-32 object-cover'
        src='https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        alt=''
      />
      {user.map((user) => {
        return (
          <div key={user.id}>
            <div className='-mt-10 flex items-center justify-center'>
              <Avatar src={user.avatarUrl} />
            </div>
            <div className='text-center my-5 pb-5'>
              <h1 className='text-xl font-bold'>{user.name}</h1>
              <span className=''>{user.role}</span>
            </div>
          </div>
        )
      })}

      <div className='flex items-center justify-center py-6 border-t border-gray-500'>
        <a
          href='#'
          className='py-4 px-6 flex items-center justify-center gap-2 font-bold text-green-700 border-2 
                border-green-700 rounded-lg hover:bg-green-700 transition-all hover:text-white'
        >
          <Pen size={22} />
          Editar perfil
        </a>
      </div>
    </div>
  )
}

export default SideBar
