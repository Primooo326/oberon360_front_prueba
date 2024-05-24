"use client"
import type { CustomButton } from '@/models/customComponents.model';
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaRegHeart } from "react-icons/fa"
import CustomCell from '../../../../components/Shared/Table/CustomCell';

export default function page() {

    const router = useRouter();

    const buttons: { title: string, element: CustomButton[] }[] = [
        {
            title: "base",
            element: [
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "secondary",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "accent",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "neutral",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "warning",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "error",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "success",
                    rounded: "md",
                },
            ],
        },
        {
            title: "outline",
            element: [
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                    outline: true,
                },
                {
                    size: "md",
                    color: "secondary",
                    rounded: "md",
                    outline: true,
                },
                {
                    size: "md",
                    color: "accent",
                    rounded: "md",
                    outline: true,
                },
                {
                    size: "md",
                    color: "neutral",
                    rounded: "md",
                    outline: true,
                },
                {
                    size: "md",
                    color: "warning",
                    rounded: "md",
                    outline: true,
                },
                {
                    size: "md",
                    color: "error",
                    rounded: "md",
                    outline: true,
                },
                {
                    size: "md",
                    color: "success",
                    rounded: "md",
                    outline: true,
                },
            ],
        },
        {
            title: "icon start",
            element: [
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "left",
                },
                {
                    size: "md",
                    color: "secondary",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "left",
                },
                {
                    size: "md",
                    color: "accent",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "left",
                },
                {
                    size: "md",
                    color: "neutral",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "left",
                },
                {
                    size: "md",
                    color: "warning",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "left",
                },
                {
                    size: "md",
                    color: "error",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "left",
                },
                {
                    size: "md",
                    color: "success",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "left",
                },
            ],
        },
        {
            title: "icon end",
            element: [
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "right",
                },
                {
                    size: "md",
                    color: "secondary",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "right",
                },
                {
                    size: "md",
                    color: "accent",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "right",
                },
                {
                    size: "md",
                    color: "neutral",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "right",
                },
                {
                    size: "md",
                    color: "warning",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "right",
                },
                {
                    size: "md",
                    color: "error",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "right",
                },
                {
                    size: "md",
                    color: "success",
                    rounded: "md",
                    icon: <FaRegHeart />,
                    iconPosition: "right",
                },
            ],
        },
        {
            title: "sizes",
            element: [
                {
                    size: "lg",
                    color: "primary",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                },
                {
                    size: "sm",
                    color: "primary",
                    rounded: "md",
                },
            ],
        },
        {
            title: "rounded",
            element: [
                {
                    size: "md",
                    color: "primary",
                    rounded: "none",
                },
                {
                    size: "md",
                    color: "primary",
                    rounded: "sm",
                },
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                },
                {
                    size: "md",
                    color: "primary",
                    rounded: "lg",
                },
                {
                    size: "md",
                    color: "primary",
                    rounded: "xl",
                },
                {
                    size: "md",
                    color: "primary",
                    rounded: "2xl",
                },
            ],
        },
        {
            title: "loading",
            element: [
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                    loader: true,
                },
                {
                    size: "md",
                    color: "secondary",
                    rounded: "md",
                    loader: true,
                },
                {
                    size: "md",
                    color: "accent",
                    rounded: "md",
                    loader: true,
                },
                {
                    size: "md",
                    color: "neutral",
                    rounded: "md",
                    loader: true,
                },
                {
                    size: "md",
                    color: "warning",
                    rounded: "md",
                    loader: true,
                },
                {
                    size: "md",
                    color: "error",
                    rounded: "md",
                    loader: true,
                },
                {
                    size: "md",
                    color: "success",
                    rounded: "md",
                    loader: true,
                },
            ],
        },
        {
            title: "block",
            element: [
                {
                    size: "md",
                    color: "primary",
                    rounded: "md",
                    block: true,
                },
                {
                    size: "md",
                    color: "secondary",
                    rounded: "md",
                    block: true,
                },
                {
                    size: "md",
                    color: "accent",
                    rounded: "md",
                    block: true,
                },
                {
                    size: "md",
                    color: "neutral",
                    rounded: "md",
                    block: true,
                },
                {
                    size: "md",
                    color: "warning",
                    rounded: "md",
                    block: true,
                },
                {
                    size: "md",
                    color: "error",
                    rounded: "md",
                    block: true,
                },
                {
                    size: "md",
                    color: "success",
                    rounded: "md",
                    block: true,
                },
            ],
        },]

    return (
        <div className="p-8 scroll overflow-auto h-screen w-full">
            <div className='flex gap-3' >

                <button className='btn btn-sm btn-warning' onClick={() => router.push('/components')
                } >
                    Volver
                </button>
                <h1 className='font-bold text-3xl mb-5'>Button components</h1>
            </div>
            <div className='grid grid-cols-1 gap-5' >
                {buttons.map((button) => (
                    <div key={button.title} >
                        <h2 className='font-bold text-xl mb-5'>{button.title}</h2>
                        <div className='flex flex-wrap gap-5' >
                            {button.element.map((element, index) => (
                                <CustomCell.Button options={element} key={index} >
                                    {element.color}
                                </CustomCell.Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
