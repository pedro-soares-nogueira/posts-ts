import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from './routes/Router'
import { PostsProvider } from './contexts/PostsContext'
import { AuthProvider } from './contexts/AuthContext'
import { Provider } from 'react-redux'
import { store } from './reducers/store'

export default function App() {
  return (
    <>
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <Provider store={store}>
        <AuthProvider>
          <PostsProvider>
            <Router />
          </PostsProvider>
        </AuthProvider>
      </Provider>
    </>
  )
}
