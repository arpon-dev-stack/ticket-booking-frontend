import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSigninMutation } from "../app/userSlice/userApi";

const SignIn = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [signin, { isError, isLoading, isSuccess }] = useSigninMutation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(form).unwrap();
            const origin = location.state?.from?.pathname || '/';

            navigate(origin)

        } catch (error) {
            console.log("failed to login", error)

        }
    }
    return (
        <div className='w-full py-10 bg-gray-50'>
            <form onSubmit={handleSubmit} className='flex flex-col min-w-48 rounded-lg px-3 py-8 max-w-80 gap-2 mx-auto shadow-lg bg-white border-gray-100'>
                <label className='text-sm font-semibold text-gray-600'>Email</label>
                <input autoComplete='off' type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="p-2 rounded-lg focus:ring-2 border focus:ring-blue-500 outline-none" />
                <label className='text-sm font-semibold text-gray-600'>Password</label>
                <input autoComplete='on' type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="p-2 rounded-lg focus:ring-2 border focus:ring-blue-500 outline-none" />
                <button type="submit" className='p-2 bg-blue-500 rounded-lg mt-5 text-white font-semibold hover:bg-blue-700' >{isLoading ? 'Sign In ...' : 'Sign In'}</button>
                <span className="mt-3 text-sm font-semibold">Don't have account <Link className="text-blue-400 ml-3" to="/signup">Sign Up</Link></span>
            </form>
        </div>
    )
}

export default SignIn