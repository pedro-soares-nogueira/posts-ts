import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Feed from './pages/Feed'
import Login from './pages/Login'
import { BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Router from './Router'
import { PostsProvider } from './contexts/PostsContext'

export default function App() {
  return (
    <>
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <PostsProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PostsProvider>
    </>
  )
}
