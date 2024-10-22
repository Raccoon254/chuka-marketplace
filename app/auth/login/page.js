'use client'
import Link from 'next/link'
import LoginButton from '@/app/components/LoginButton'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'

export default function Login() {
    const { data: session } = useSession()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [passwordType, setPasswordType] = useState('password')

    useEffect(() => {
        const url = window.location.href
        if (url.endsWith('error=CredentialsSignin')) {
            enqueueSnackbar('Invalid email or password', { variant: 'error' })
            window.history.replaceState({}, null, url.split('?')[0])
        }
    }, [enqueueSnackbar])

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

        const res = await signIn('credentials', {
            email: email,
            password: password,
            redirect: true,
            callbackUrl: '/catalog',
        })

        setIsLoading(false)
    }

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
                    <form className="shadow-sm p-6 rounded" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-100 text-sm mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="input input-bordered input-md w-full max-w-md"
                                id="email"
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                autoComplete={'email'}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (!validateEmail(e.target.value)) {
                                        setEmailError('Invalid email')
                                    } else {
                                        setEmailError('')
                                    }
                                }}
                            />
                            {emailError && <p className="text-red-500">{emailError}</p>}
                        </div>
                        <div className="mb-6 relative">
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
                        <div className="flex flex-col gap-3 items-center justify-between">
                            <input
                                type={'submit'}
                                className="btn btn-primary bg-blue-500 text-white ring-2 ring-offset-1 w-full"
                                value={'Sign In'}
                            />
                        </div>
                        <div className="flex text-[12px] underline underline-offset-2 gap-3">
                            <Link
                                className="inline-block align-baseline my-2 text-blue-500 hover:text-blue-800"
                                href={'/auth/recovery'}
                            >
                                Forgot Password?
                            </Link>
                            <Link
                                className={'inline-block align-baseline my-2 text-blue-500 hover:text-blue-800'}
                                href={'/auth/register'}
                            >
                                New User? Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
