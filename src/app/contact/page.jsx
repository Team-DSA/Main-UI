import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import Image from 'next/image'
import BoxReveal from '../../components/BoxReval'

const page = () => {
    return (
        <div>
            <BoxReveal boxColor='#E33665'>

                <NavigationBar />

                <div className="mx-32 flex flex-col items-center justify-center my-10">
                    <div className="text-3xl font-medium">
                        <p>Contact Us</p>
                    </div>
                    <div>
                        <p>We’re here to answer your questions and help you schedule your next detailing appointment. Contact us today to learn more about our services and pricing.</p>
                    </div>
                </div>

                <div className="mx-32 flex flex-col items-center justify-center">
                    <div className="my-3">
                        <span className="text-myAccent">|</span><span>Let's Connect</span>
                    </div>
                    <div className="text-2xl mb-6">
                        <p>Contact us today to schedule your next detailing
                            appointment</p>
                    </div>
                    <div className="flex my-3 items-center justify-between  gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <Image src='/call.png' width={20} height={20} />
                            <p className="font-medium my-1">Talk to our team</p>
                            <p>+765 294 - 847</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image src='/mail.png' width={20} height={20} />
                            <p className="font-medium my-1">Email us</p>
                            <p>cars@maintainer.com</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image src='/clock.png' width={20} height={20} />
                            <p className="font-medium my-1">Operating hour</p>
                            <p>Everyday | 8 AM - 5 PM</p>
                        </div>

                    </div>
                </div>


                <Footer />
            </BoxReveal>

        </div>
    )
}

export default page