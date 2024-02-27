
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from './redux/reducers/slices/authSlice'

const AppRouter = () => {
  const { isLogin } = useSelector(state => state.auth)
  console.log(isLogin)
  return (
    <>appRouter</>
  )
}
function App() {
  return (
    <>
      <AppRouter />
      Hanzla
    </>
  )
}

export default App
