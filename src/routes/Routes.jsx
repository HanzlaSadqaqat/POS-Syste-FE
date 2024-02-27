
import Login from '../pages/LoginPage/Login'

const Routes = (isLogin) => {
    if (isLogin) {
        return [
            { path: "/login", element: <Login /> }
        ]
    } else {
        return [
            { path: "/login", element: <Login /> }
        ]
    }


}

export default Routes