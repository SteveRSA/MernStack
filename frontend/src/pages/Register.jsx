import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaLock } from 'react-icons/fa'


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>

            <div className="signup_container">
                <div className="signup_form_container">
                    <div className="signup_left">
                        <h1>Welcome Back</h1>
                        <Link to="/login">
                            <button type="button" className="white_btn">
                                Sign in  
                                <FaLock className="pb-1"/>
                            </button>
                        </Link>
                    </div>
                    <div className="signup_right">
                        <h1>Create Account</h1>
                        <form className="width60" onSubmit={onSubmit}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='name'
                                    name='name'
                                    value={name}
                                    placeholder='Enter your name'
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    name='email'
                                    value={email}
                                    placeholder='Enter your email'
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='password'
                                    name='password'
                                    value={password}
                                    placeholder='Enter password'
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='password2'
                                    name='password2'
                                    value={password2}
                                    placeholder='Confirm password'
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <button type='submit' className='btn green_btn'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
