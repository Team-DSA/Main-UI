"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Login from '@/components/Login'

const page = () => {
    const images = [
        '/cars1.jpg',
        '/cars2.jpg',
        '/cars3.jpg',
        '/cars4.jpg',
        '/cars5.jpg',
        '/cars6.jpg',
        '/cars7.jpg',
    ];
    return (
        <ImagesSlider className="h-screen" images={images}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -80,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="z-50 flex flex-col justify-center items-center"
            >
                <motion.div className=" text-center  py-4">
                    <Login />
                </motion.div>
            </motion.div>
        </ImagesSlider>
    );

}

export default page