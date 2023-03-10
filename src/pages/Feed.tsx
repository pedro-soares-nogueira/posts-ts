import Header from '../components/Header'
import Post from '../components/Post'
import SideBar from '../components/SideBar'
import { useContext, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useAppDispatch, useAppSelector } from '../hooks/useReducer'
import NewPost from '../components/NewPost'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { postActios } from '../reducers/postsSlice'

const Feed = () => {
  const { posts, loading } = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(postActios.fetchPosts())
  }, [])

  return (
    <>
      <Header />

      <div className='max-w-[1000px] mx-4 lg:m-auto mt-8 lg:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 '>
        {loading && (
          <SkeletonTheme baseColor='#202020' highlightColor='#444'>
            <div className='flex flex-col gap-4'>
              <Skeleton height={400} />
            </div>
            <div className='md:col-span-2'>
              <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-4'>
                  <Skeleton height={50} />
                  <Skeleton height={200} />
                </div>

                <div className='flex flex-col gap-4'>
                  <Skeleton height={50} />
                  <Skeleton height={200} />
                </div>
              </div>
            </div>
          </SkeletonTheme>
        )}

        <div>
          <SideBar />
        </div>

        <div className='md:col-span-2 space-y-8 mb-20'>
          <Dialog.Root>
            <Dialog.Trigger
              className='py-2 px-4 flex items-center justify-center gap-2 font-bold text-purple-400 border-2 
                border-purple-400 rounded-lg hover:bg-purple-400 transition-all hover:text-white'
            >
              Nova postagem
            </Dialog.Trigger>

            <NewPost />
          </Dialog.Root>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed
