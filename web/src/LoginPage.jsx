import { Link } from 'react-router-dom'
import { LoginForm } from 'wasp/client/auth'

export const LoginPage = () => {
return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-100'>
        <div className='bg-white shadow-md rounded-lg p-8 w-96'>
            <h1 className='text-2xl font-bold text-center mb-6'>Welcome Back</h1>
            <LoginForm />
            <div className='text-center mt-4'>
                <span className='text-gray-600'>
                    Don't have an account?{' '}
                    <Link to="/signup" className='text-blue-500 hover:underline'>
                        Sign up here
                    </Link>
                </span>
            </div>
        </div>
    </div>
)
}