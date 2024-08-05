'use client'
import {useSession, signIn, signOut} from "next-auth/react"
import Link from "next/link";

export default function LoginButton() {
    const {data: session} = useSession()
    if (session) {
        return (
            <div className="grid md:grid-cols-2 gap-2">
                <button className={'btn text-white w-full ring-1 ring-offset-1'} onClick={() => signOut()}>
                    Logout <i className="fas fa-sign-out-alt"> </i>
                </button>
                <Link className="btn text-white w-full ring-1 ring-offset-1" href={'/catalog'}>
                    Catalog <i className="fas fa-blender"></i>
                </Link>
            </div>
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