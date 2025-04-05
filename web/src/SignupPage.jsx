import { Link } from 'react-router-dom'
import { SignupForm } from 'wasp/client/auth'

export const SignupPage = () => {
return (
     <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-100'>
            <div className='bg-white shadow-md rounded-lg p-8 w-96'>
                <h1 className='text-2xl font-bold text-center mb-6'>Welcome Back</h1>
                <SignupForm />
                <div className='text-center mt-4'>
                    <span className='text-gray-600'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-500 hover:underline'>
                            Log in here
                        </Link>
                    </span>
                </div>
            </div>
        </div>
)
}