import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaPenFancy } from 'react-icons/fa'



function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

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

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>

            <div className="login_container">
                <div className="login_form_container">
                    <div className="login_left">
                        <form onSubmit={onSubmit}>
                            <h1>Login to Your Account</h1>
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
                                <button type='submit' className='btn green_btn'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="login_right">
                        <h1>New Here ?</h1>
                        <Link to="/register">
                            <button type="button" className="white_btn">
                                Sign Up  
                                <FaPenFancy className="pb-1" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
