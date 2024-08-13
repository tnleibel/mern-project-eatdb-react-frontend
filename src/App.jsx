import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import * as authService from '../src/services/authService'
import Register from "./components/Register/Register";
import SignIn from "./components/SignIn/SignIn";
import NavBar from './components/NavBar/NavBar';

const App = () => {
  const [user, setUser] = useState(authService.getUser())

  return (
    <>
      <div>
          <h1>Hello world!</h1>
      </div>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='sign-up' element={<Register setUser={setUser} />} />
        <Route path='sign-in' element={<SignIn setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App
