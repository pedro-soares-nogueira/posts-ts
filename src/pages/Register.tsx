import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const newUser = {
      name,
      password,
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        toast.success('Usuário Regristado')
        console.log(res)
      })
      .catch((err) => {
        toast.error('Failed :' + err.message)
      })
  }

  return (
    <>
      <div className='h-screen w-full flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='bg-zinc-800 rounded-md p-6 max-w-[27rem] mx-4'>
          <div className='mb-10'>
            <h1 className='font-semibold text-2xl'>
              Faça seu cadastro na plataforma!!
            </h1>
            <span className='text-sm'>
              Crie seu usuário somente com usuário e senha
            </span>
          </div>
          <div>
            <label>Username</label>
            <input
              onChange={(event) => setName(event.target.value)}
              value={name}
              type='text'
              className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-green-400 transition-all'
            />
          </div>
          <br />
          <div>
            <label>Password</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type='text'
              className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-green-400 transition-all'
            />
          </div>

          <br />
          <div className='flex flex-col gap-4'>
            <button
              type='submit'
              className='py-4 px-6 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
            transition-all disabled:opacity-25'
            >
              Register
            </button>

            <Link to='/' className='flex gap-2 items'>
              Voltar e logar
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
