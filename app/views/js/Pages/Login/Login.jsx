import { Head, usePage, router, Link } from '@inertiajs/react'
import React, { useState, useEffect, Suspense, lazy } from 'react'
import { SimpleErrorText} from '@components/index.jsx'

const Login = () => {
    const { errors, users } = usePage().props;
    const [values, setValues] = useState({});
    const [errorsFront, setErrorsFront] = useState(errors);
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
          ...values,
          [key]: value
        }))
    }
    
    const handleLogin = async (e) => {
        e.preventDefault();
        router.post('/', values)
    }

    return (
        <>
            <Head title="Login Page" />
            <div className="flex flex-col justify-center items-center bg-white h-[100vh]">
                <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
                    <div className="my-auto mb-auto flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px] border border-zinc-200 p-4 rounded">
                        <p className="text-[32px] font-bold text-zinc-950 dark:text-white">Sign In</p>
                        <p className="mb-2.5 font-normal text-sm text-zinc-950 dark:text-zinc-400">Enter your email and password
                        to sign in!</p>
                        <div className="mt-2">
                            <form className="pb-2" onSubmit={handleLogin}>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <label 
                                            className="text-zinc-950 dark:text-white" 
                                            htmlFor="email">Email</label>
                                        <input 
                                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400" 
                                            id="email" 
                                            placeholder="name@example.com" 
                                            type="email" 
                                            autoCapitalize="none" 
                                            autoComplete="email" 
                                            autoCorrect="off" 
                                            name="email"
                                            onChange={handleInput} />
                                            {errors.email && <SimpleErrorText dataError={errors.email} />}
                                            {errors.auth && <SimpleErrorText dataError={errors.auth} />}
                                        <label 
                                            className="text-zinc-950 mt-2 dark:text-white" 
                                            htmlFor="password">Password</label>
                                        <input 
                                            id="password" 
                                            placeholder="Password" 
                                            type="password" 
                                            autoComplete="current-password"
                                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                            name="password"
                                            onChange={handleInput} />
                                            {errors.password && <SimpleErrorText dataError={errors.password} />}
                                    </div>
                                    <button 
                                        className="whitespace-nowrap ring-offset-background text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-black-foreground hover:bg-black/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                                        type="submit" disabled={loading}>
                                        {loading ? 'Processing' : 'Sign In'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
