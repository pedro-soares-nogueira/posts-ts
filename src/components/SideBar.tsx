import Avatar from './Avatar'
import { useContext } from 'react'
import { AuthContext } from './../contexts/AuthContext'

interface UserProps {
  id: number
  name: string
  avatarUrl: string
  role: string
}

const SideBar = () => {
  const { user } = useContext(AuthContext)

  const { name, avatarUrl, role } = user[0]

  return (
    <div className='rounded-lg overflow-hidden bg-zinc-800'>
      <img
        className='w-full h-32 object-cover'
        src='https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
        alt=''
      />

      <div>
        <div className='-mt-10 flex items-center justify-center'>
          <Avatar src={avatarUrl} />
        </div>
        <div className='text-center my-5 pb-5'>
          <h1 className='text-xl font-bold'>{name}</h1>
          <span className=''>{role}</span>
        </div>
      </div>
    </div>
  )
}

export default SideBar
