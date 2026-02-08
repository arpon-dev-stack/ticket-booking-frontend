import { Link } from "react-router-dom"
import { useSignUpMutation } from "../app/userSlice/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
    const [form, setForm] = useState({ email: '', password: '', name: '' });
    const [signUp] = useSignUpMutation();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = signUp(form).unwrap();
            toast.promise(response, {
                pending: "Sign Un...",
                success: {
                    render({ data }) {
                        return data?.message || 'Successfully SignUp.'
                    }
                },
                error: {
                    render({ data }) {
                        return data?.message || "Failed To SignUp."
                    }
                }
            });
            await response;
            navigate('/signin');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full py-10 bg-gray-50'>
            <form onSubmit={handleSubmit} className='flex flex-col min-w-48 rounded-lg px-3 py-8 max-w-80 gap-2 mx-auto shadow-lg bg-white border-gray-100'>
                <label className='text-sm font-semibold text-gray-600'>Name</label>
                <input autoComplete='off' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required type="text" className="p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none border" />
                <label className='text-sm font-semibold text-gray-600'>Email</label>
                <input autoComplete='off' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" className="p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none border" />
                <label className='text-sm font-semibold text-gray-600'>Password</label>
                <input autoComplete='on' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required type="password" className="p-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none border" />
                <button type="submit" className='p-2 bg-emerald-600 rounded-lg mt-5 text-white font-semibold hover:bg-emerald-500' >Sign Up</button>
                <span className="mt-3 text-sm font-semibold">Already have account <Link className="text-blue-400 ml-3" to="/signin">Sign In</Link></span>
            </form>
        </div>
    )
}

export default SignUp