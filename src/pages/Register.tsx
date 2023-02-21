import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'phosphor-react'

const newUserFormSchema = z.object({
  name: z.string().min(2, { message: 'Minimo de 2 caracters' }),
  username: z
    .string()
    .min(1, { message: 'Este campo precisa ser preenchido' })
    .email('Este campo precisa ser uma email')
    .min(5, { message: 'Minimo de 5 caracters' }),
  password: z.string().min(5, { message: 'Minimo de 5 caracters' }),
  avatarURL: z.string().optional(),
  role: z.string().min(2, { message: 'Minimo de 2 caracters' }),
})

type newUserFormInputs = z.infer<typeof newUserFormSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<newUserFormInputs>({
    resolver: zodResolver(newUserFormSchema),
  })

  const onSubmit = (data: newUserFormInputs) => {
    const { name, username, password, avatarURL, role } = data

    const newUser = {
      name,
      username,
      password,
      avatarURL,
      role,
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        toast.success('Usuário Regristado')
      })
      .catch((err) => {
        toast.error('Failed :' + err.message)
      })

    reset()
  }

  return (
    <>
      <div className='h-screen w-full flex items-center justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-zinc-800 rounded-md p-6 max-w-[27rem] mx-4'
        >
          <div className='mb-10'>
            <h1 className='font-semibold text-2xl'>
              Faça seu cadastro na plataforma!!
            </h1>
            <span className='text-sm'>
              Crie seu usuário somente com usuário e senha
            </span>
          </div>
          <div className='space-y-2'>
            <div>
              <label>Nome</label>
              <input
                {...register('name')}
                type='text'
                className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-purple-400 transition-all'
              />
              {errors.name && (
                <small className='text-red-500'>{errors.name.message}</small>
              )}
            </div>
            <div>
              <label>
                Email <small>(você usará para logar)</small>
              </label>
              <input
                {...register('username')}
                type='text'
                className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-purple-400 transition-all'
              />
              {errors.username && (
                <small className='text-red-500'>
                  {errors.username.message}
                </small>
              )}
            </div>
            <div>
              <label>Qual sua posição na empresa?</label>
              <input
                {...register('role')}
                type='text'
                className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-purple-400 transition-all'
              />
              {errors.role && (
                <small className='text-red-500'>{errors.role.message}</small>
              )}
            </div>

            <div>
              <label>Defina uma senha:</label>
              <input
                {...register('password')}
                type='password'
                className='bg-zinc-900 rounded-md border border-gray-600 p-2 mt-2 font-semibold 
                        w-full outline-none focus:border-purple-400 transition-all'
              />
              {errors.password && (
                <small className='text-red-500'>
                  {errors.password.message}
                </small>
              )}
            </div>
          </div>

          <br />
          <div className='flex flex-col gap-4'>
            <button
              type='submit'
              className='py-4 px-6 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
            transition-all disabled:opacity-25'
            >
              Registrar
            </button>

            <Link to='/' className='flex gap-2 text-sm'>
              <ArrowLeft size={18} className='mt-[1px]' />
              <span className='text-purple-400'>Voltar e logar</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
