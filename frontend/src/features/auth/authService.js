import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        setTimeout(logout, 3500000);
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        setTimeout(logout, 3500000);
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

// function myFunc(arg) {
//   console.log(`arg was => ${arg}`);
// }




const authService = {
    register,
    logout,
    login,
}

export default authService
