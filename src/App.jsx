import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as authService from '../src/services/authService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='sign-up' element={<SignupForm />} />
      <Route path='sign-in' element={<SigninForm />} />
    </Routes>
  );
}

export default App
