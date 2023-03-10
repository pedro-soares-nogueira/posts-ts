import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'

const Header = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className='bg-zinc-800 py-3 border-b border-gray-700'>
      <div className='flex items-center justify-between max-w-[1100px] m-auto px-4'>
        <div></div>
        <h1 className='font-bold text-2xl bg-zinc-800 text-purple-400'>
          Pedro | BlogFeed
        </h1>
        <Link
          style={{ float: 'right' }}
          to={'/'}
          onClick={logout}
          className='py-2 px-4 flex items-center justify-center gap-2 font-bold text-purple-400 border-2 
                border-purple-400 rounded-lg hover:bg-purple-400 transition-all hover:text-white'
        >
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Header
