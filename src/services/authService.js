const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL
import { jwtDecode } from "jwt-decode"

const signup = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        const json = await res.json()
        
        if(json.token) {
            localStorage.setItem('token', json.token)
        }
        if(json.error) {
            throw new Error(json.error)
        }
        return json
    } catch (error) {
        console.log(error)
        throw error
    }
}

const signin = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        const json = await res.json()
        if(json.error) {
            throw new Error(json.error)
        }
        if(json.token) {
            localStorage.setItem('token', json.token)
            const user = jwtDecode(json.token);
            // const user = JSON.parse(atob(json.token.split('.')[1]))
            return { token: json.token, user };
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getUser = () => {
    const token = localStorage.getItem('token')
    if(!token) return null
    try {
        const user = jwtDecode(token);
        return user;
    } catch (e) {
        console.log('decoding error', e);
        return null;
    }
//     const user = JSON.parse(atob(token.split('.')[1]))
//     return user
}

const signout = () => {
    localStorage.removeItem('token')
}

export {
    signup,
    signin,
    getUser,
    signout,
}