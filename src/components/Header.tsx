import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-zinc-800 py-3 border-b border-gray-700'>
      <div className='flex items-center justify-between max-w-[1100px] m-auto'>
        <div></div>
        <div className='flex items-center justify-between gap-3'>
          <img src={logo} alt='Logotipo' className='w-14 bg-zinc-800' />
          <h1 className='font-bold text-2xl bg-zinc-800'>Pedro | BlogFeed</h1>
        </div>
        <Link
          style={{ float: 'right' }}
          to={'/'}
          className='py-2 px-4 flex items-center justify-center gap-2 font-bold text-green-700 border-2 
                border-green-700 rounded-lg hover:bg-green-700 transition-all hover:text-white'
        >
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Header
