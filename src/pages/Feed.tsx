import Header from '../components/Header'
import Post from '../components/Post'
import SideBar from '../components/SideBar'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayyk Brito',
      role: 'Educador @EcoPlural',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
      { type: 'tag', content: 'css' },
      { type: 'tag', content: 'html' },
      { type: 'tag', content: 'javascript' },
    ],
    publishedAt: new Date('2023-01-10 15:00:31'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/ngrpedro.png',
      name: 'Pedro Soares',
      role: 'CTO @ Eco Plural',
    },
    content: [
      { type: 'paragraph', content: 'Fala pessoal 👋' },
      {
        type: 'paragraph',
        content:
          'Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻',
      },
      { type: 'paragraph', content: 'Acesse e deixe seu feedback' },
      { type: 'link', content: '👉 devonlane.design' },
      { type: 'tag', content: 'css' },
      { type: 'tag', content: 'html' },
      { type: 'tag', content: 'javascript' },
    ],
    publishedAt: new Date('2023-02-09 08:00:31'),
  },
]

const Feed = () => {
  return (
    <>
      <Header />
      <div className='max-w-[1100px] mx-4 lg:m-auto mt-8 lg:mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 '>
        <div className='sticky top-8'>
          <SideBar />
        </div>
        <div className='md:col-span-2 space-y-8'>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Feed
