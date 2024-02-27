
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Routes from './routes/Routes';

const AppRouter = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  console.log(isLogin)
  return useRoutes(Routes(isLogin))
}
function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
