import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from './routes/Router'
import { PostsProvider } from './contexts/PostsContext'
import { AuthProvider } from './contexts/AuthContext'

export default function App() {
  return (
    <>
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <AuthProvider>
        <PostsProvider>
          <Router />
        </PostsProvider>
      </AuthProvider>
    </>
  )
}
