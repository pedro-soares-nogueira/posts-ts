import Header from '../components/Header'
import Post from '../components/Post'
import SideBar from '../components/SideBar'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { PostsContext } from './../contexts/PostsContext'
import NewPost from '../components/NewPost'

const Feed = () => {
  const { posts } = useContext(PostsContext)

  return (
    <>
      <Header />
      <div className='max-w-[1100px] mx-4 lg:m-auto mt-8 lg:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 '>
        <div className='sticky top-8'>
          <SideBar />
        </div>
        <div className='md:col-span-2 space-y-8 mb-20'>
          {/* new post */}
          <NewPost />
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed
