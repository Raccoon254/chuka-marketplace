'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                {/*Signed in as {session.user.email} <br />*/}
                <button className={'btn text-white w-full ring-1 ring-offset-1'} onClick={() => signOut()}>
                    Logout
                </button>
            </>
        )
    }
    return (
        <>
            {/*Not signed in <br />*/}
            <button className={'btn w-full bg-green-300 ring-1 ring-offset-1'} onClick={() => signIn('google')}>
                Sign in with Google <i className="fab fa-google fa-lg"> </i>
            </button>
        </>
    )
}