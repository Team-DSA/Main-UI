import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import ProfileMenu from "./ProfileMenu";


const CustomLink = ({ href, title, className = "" }) => {
    return (
        <Link href={href} className={`${className} relative group text-white`}>
            {title}
            <span className={`h-[1px] inline-block bg-myAccent text-myAccent absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 w-0 hover:w-full`}>&nbsp;</span>
        </Link>
    );
};

const NavigationBar = async () => {

    const session = await auth()
    console.log(session)
    return (
        <div className=" w-full flex justify-around h-24 items-center bg-myBackground bg-opacity-30 border-b-[1px] border-myAccent/20 ">
            <div>
                <h1 className="font-bold text-xl text-white"><Link href='/'>Bhai Bot</Link></h1>
            </div>
            <div className='flex justify-between w-[450px]'>
                <CustomLink href="/services" title='Home' />
                <CustomLink href="/pricing" title='How we work' />
                <CustomLink href="/about" title='About Us' />
                <CustomLink href="/try" title='Try The Bot' />
                {/* <CustomLink href="/dashboard" title='Dashboard' />  */}
            </div>
            <div className="relative">
                {session ? (
                    <ProfileMenu user={session.user}/>
                ) : (
                    <Link href='/register'>
                        <Button variant="ghost" className="bg-myAccent/70 text-white">Get Started</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};


export default NavigationBar;
