"use client"
import type { CustomButton } from '@/models/customComponents/button.model';
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaHome } from "react-icons/fa"


export default function page() {

    const router = useRouter();

    const buttons: { title: string, element: CustomButton[] }[] = [
        {
            title: "base",
            element: [
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-secondary",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-accent",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-neutral",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-warning",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-error",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-success",
                    rounded: "rounded-md",
                },
            ],
        },
        {
            title: "outline",
            element: [
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                    outline: true,
                },
                {
                    size: "btn-md",
                    color: "btn-secondary",
                    rounded: "rounded-md",
                    outline: true,
                },
                {
                    size: "btn-md",
                    color: "btn-accent",
                    rounded: "rounded-md",
                    outline: true,
                },
                {
                    size: "btn-md",
                    color: "btn-neutral",
                    rounded: "rounded-md",
                    outline: true,
                },
                {
                    size: "btn-md",
                    color: "btn-warning",
                    rounded: "rounded-md",
                    outline: true,
                },
                {
                    size: "btn-md",
                    color: "btn-error",
                    rounded: "rounded-md",
                    outline: true,
                },
                {
                    size: "btn-md",
                    color: "btn-success",
                    rounded: "rounded-md",
                    outline: true,
                },
            ],
        },
        {
            title: "icon start",
            element: [
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "left",
                },
                {
                    size: "btn-md",
                    color: "btn-secondary",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "left",
                },
                {
                    size: "btn-md",
                    color: "btn-accent",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "left",
                },
                {
                    size: "btn-md",
                    color: "btn-neutral",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "left",
                },
                {
                    size: "btn-md",
                    color: "btn-warning",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "left",
                },
                {
                    size: "btn-md",
                    color: "btn-error",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "left",
                },
                {
                    size: "btn-md",
                    color: "btn-success",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "left",
                },
            ],
        },
        {
            title: "icon end",
            element: [
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "right",
                },
                {
                    size: "btn-md",
                    color: "btn-secondary",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "right",
                },
                {
                    size: "btn-md",
                    color: "btn-accent",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "right",
                },
                {
                    size: "btn-md",
                    color: "btn-neutral",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "right",
                },
                {
                    size: "btn-md",
                    color: "btn-warning",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "right",
                },
                {
                    size: "btn-md",
                    color: "btn-error",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "right",
                },
                {
                    size: "btn-md",
                    color: "btn-success",
                    rounded: "rounded-md",
                    icon: <FaHome />,
                    iconPosition: "right",
                },
            ],
        },
        {
            title: "sizes",
            element: [
                {
                    size: "btn-lg",
                    color: "btn-primary",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-sm",
                    color: "btn-primary",
                    rounded: "rounded-md",
                },
            ],
        },
        {
            title: "rounded",
            element: [
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-none",
                },
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-sm",
                },
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                },
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-lg",
                },
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-xl",
                },
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-2xl",
                },
            ],
        },
        {
            title: "loading",
            element: [
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                    loader: true,
                },
                {
                    size: "btn-md",
                    color: "btn-secondary",
                    rounded: "rounded-md",
                    loader: true,
                },
                {
                    size: "btn-md",
                    color: "btn-accent",
                    rounded: "rounded-md",
                    loader: true,
                },
                {
                    size: "btn-md",
                    color: "btn-neutral",
                    rounded: "rounded-md",
                    loader: true,
                },
                {
                    size: "btn-md",
                    color: "btn-warning",
                    rounded: "rounded-md",
                    loader: true,
                },
                {
                    size: "btn-md",
                    color: "btn-error",
                    rounded: "rounded-md",
                    loader: true,
                },
                {
                    size: "btn-md",
                    color: "btn-success",
                    rounded: "rounded-md",
                    loader: true,
                },
            ],
        },
        {
            title: "block",
            element: [
                {
                    size: "btn-md",
                    color: "btn-primary",
                    rounded: "rounded-md",
                    block: true,
                },
                {
                    size: "btn-md",
                    color: "btn-secondary",
                    rounded: "rounded-md",
                    block: true,
                },
                {
                    size: "btn-md",
                    color: "btn-accent",
                    rounded: "rounded-md",
                    block: true,
                },
                {
                    size: "btn-md",
                    color: "btn-neutral",
                    rounded: "rounded-md",
                    block: true,
                },
                {
                    size: "btn-md",
                    color: "btn-warning",
                    rounded: "rounded-md",
                    block: true,
                },
                {
                    size: "btn-md",
                    color: "btn-error",
                    rounded: "rounded-md",
                    block: true,
                },
                {
                    size: "btn-md",
                    color: "btn-success",
                    rounded: "rounded-md",
                    block: true,
                },
            ],
        },
    ]

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
                                <button key={index} className={`btn ${element.size} ${element.color} ${element.rounded} ${element.block ? 'btn-block' : ''} ${element.outline ? 'btn-outline' : ''}`} >
                                    {element.icon && element.iconPosition === 'left' && element.icon}
                                    {element.loader && <span className='loading loading-spinner' />}
                                    {element.icon && element.iconPosition === 'right' && element.icon}
                                    Button
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
