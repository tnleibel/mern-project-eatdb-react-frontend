import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as authService from '../src/services/authService'
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";

const App = () => {
  const [user, setUser] = useState(authService.getUser())

  return (

    <div>
        <h1>Hello world!</h1>
        <Register />
    </div>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='sign-up' element={<SignupForm />} />
      <Route path='sign-in' element={<SigninForm />} />
    </Routes>

  );
}

export default App
