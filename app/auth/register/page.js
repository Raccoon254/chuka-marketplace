'use client'
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import { useSnackbar } from 'notistack'
import Link from "next/link";
import LoginButton from "@/app/components/LoginButton";
import { signIn, signOut, useSession } from 'next-auth/react'

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { data: session } = useSession()
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [passwordType, setPasswordType] = useState('password')

    const validateEmail = (email) => {
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        return re.test(email)
    }

    const validatePassword = (password) => {
        return password.length >= 1
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setEmailError('Invalid email')
            enqueueSnackbar('Invalid email', { variant: 'error' })
            return
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters')
            enqueueSnackbar('Password must be at least 8 characters', { variant: 'error' })
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, password}),
            });
            if (response.ok) {
                enqueueSnackbar('User created successfully', { variant: 'success' })
                setIsLoading(false)
                router.push('/auth/login');
            } else {
                setIsLoading(false)
                const data = await response.json();
                enqueueSnackbar(data.message || 'Registration failed', { variant: 'error' })
            }
        } catch (err) {
            enqueueSnackbar('Registration failed, Please try again', { variant: 'error' })
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-950 grid place-items-center w-full">
                <span className="loading loading-ring loading-lg"></span>
            </main>
        )
    }

    if (session) {
        return(
            <main className="min-h-screen bg-gray-950 grid place-items-center w-full">
                <div className="w-full max-w-md m-4 p-4 ">
                    <center>
                        <div className="w-fit relative flex flex-col items-center">
                            <h2 className="text-3xl font-semibold">
                                <span className="text-green-400">Chuka Marketplace</span>
                            </h2>
                            <div className="absolute top-[35px] right-0 mb-4 text-xs font-medium text-gray-400">
                                By{' '}
                                <a className={'text-blue-500'} href="https://stevetom.vercel.app">
                                    KenTom
                                </a>
                            </div>
                        </div>
                    </center>
                    <div className="w-full mt-8">
                        <div className="shadow-sm p-6 rounded">
                            <div className="mb-4 center">
                                <h2 className="text-xl font-semibold">Logged in as {session.user.email}</h2>
                            </div>
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <div className="bg-gray-950 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto px-4 sm:px-10 sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-3xl font-bold text-white">Register</h2>
                <div className="mt-2 text-lg flex text-gray-400">Welcome to
                    <span className='flex ml-1 flex-col justify-end'>
                        <h1 className='text-lg font-semibold'>Marketplace</h1>
                        <p className='-mt-[4px] text-end uppercase text-xs opacity-40'>Chuka</p>
                    </span>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="input input-bordered input-md w-full max-w-md"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="input input-bordered input-md w-full max-w-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-gray-100 text-sm mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="input input-bordered input-md w-full max-w-md"
                                id="password"
                                type={passwordType}
                                placeholder="************"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    if (!validatePassword(e.target.value)) {
                                        setPasswordError('Password must be at least 8 characters')
                                    } else {
                                        setPasswordError('')
                                    }
                                }}
                            />
                            <span className="absolute right-0 top-[30px] mt-2 mr-2">
								<button
                                    type="button"
                                    className="btn btn-xs btn-circle btn-ghost"
                                    onClick={() => {
                                        setIsPasswordVisible(!isPasswordVisible)
                                        setPasswordType(isPasswordVisible ? 'password' : 'text')
                                    }}
                                >
									<i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
								</button>
							</span>
                            {passwordError && <p className="text-red-500">{passwordError}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={'btn btn-primary bg-blue-500 text-white ring-2 ring-offset-1 w-full'}
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <div>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link
                                href="/auth/login"
                                className="font-medium text-blue-500 hover:text-blue-400"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}