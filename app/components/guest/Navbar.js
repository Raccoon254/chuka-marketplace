import Link from "next/link";
const Navbar = () => {
    return (
        <nav className={'flex justify-between bg-gray-950 text-gray-50 items-center py-2 md:py-3 px-2 md:px-4'}>
            <div className='flex flex-col justify-end'>
                <h1 className='text-lg font-semibold'>Marketplace</h1>
                <p className='-mt-[4px] text-end uppercase text-xs opacity-40'>Chuka</p>
            </div>
            <ul className={'flex'}>
                <li className='inline-block mx-2'>
                    <Link href='/'>Home</Link>
                </li>
                <li className='inline-block mx-2'>
                    <Link href='/about'>About</Link>
                </li>
                <li className='inline-block mx-2'>
                    <Link href='/contact'>Contact</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar