import { ChangeEvent, FormEvent, useContext } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowArcRight, ArrowRight } from 'phosphor-react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { api } from '../lib/axios'
import { AuthContext } from '../contexts/AuthContext'

interface ILogin {
  username: string
  password: string
}

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginFormInpus = z.infer<typeof loginFormSchema>

const Login = () => {
  const { fetchUser } = useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm<LoginFormInpus>()

  const navigate = useNavigate()

  const onSubmit = async (data: LoginFormInpus) => {
    const user = await fetchUser(data)

    const validUsername = user.length

    if (validUsername === 0) {
      return toast.error('Usuário invalido')
    }

    if (user[0].password !== data.password) {
      return toast.error('Senha invalida')
    }

    navigate('/feed')
  }
  return (
    <>
      <div className='h-screen w-full flex items-center justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
              {...register('username')}
              type='text'
              className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-purple-400 transition-all'
            />
          </div>
          <br />
          <div>
            <label>Password</label>
            <input
              {...register('password')}
              type='password'
              className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-purple-400 transition-all'
            />
          </div>

          <br />

          <div className='flex flex-col gap-4'>
            <button
              type='submit'
              className='py-4 px-6 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
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
