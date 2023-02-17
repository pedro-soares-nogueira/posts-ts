import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowArcRight, ArrowRight } from 'phosphor-react'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    fetch(`http://localhost:3000/users?name=${name}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (Object.keys(res).length === 0) {
          return toast.error('Usuário invalido')
        } else {
          if (res[0].password === password) {
            toast.success('Success')
            sessionStorage.setItem('userId', res[0].id)
            navigate('/feed')
          } else {
            toast.error('Senha inválida')
          }
        }
      })
      .catch((err) => {
        toast.error('Failed :' + err.message)
      })
  }
  return (
    <>
      <div className='h-screen w-full flex items-center justify-center'>
        <form
          onSubmit={handleSubmit}
          className='bg-zinc-800 rounded-md p-6 max-w-[27rem] w-full mx-4'
        >
          <div className='mb-10'>
            <h1 className='font-semibold text-2xl'>
              Entre e começe a interagir!
            </h1>
            <span className='text-sm'>Obrigado pela confiança!</span>
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
              Entrar
            </button>

            <Link to='/register' className='flex gap-2 items'>
              Não tenho cadastro. Registrar <ArrowRight size={22} />
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
