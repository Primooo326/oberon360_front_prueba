"use client"
import CustomCell from "@/components/shared/Table/CustomCell";
import type { CustomAvatar } from "@/models/customComponents.model";
import { useRouter } from "next/navigation";


export default function page() {
    const router = useRouter();
    const src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
    const Avatars: { title: string, element: CustomAvatar[] }[] = [
        {
            title: "Base",
            element: [
                {
                    size: "2xl",
                    rounded: "full",
                },
            ],
        },
        {
            title: "Status",
            element: [
                {
                    size: "2xl",
                    rounded: "full",
                    status: "online",
                },
                {
                    size: "2xl",
                    rounded: "full",
                    status: "offline",
                },
            ],
        },
        {
            title: "Size",
            element: [
                {
                    size: "5xl",
                    rounded: "full",
                },
                {
                    size: "4xl",
                    rounded: "full",
                },
                {
                    size: "3xl",
                    rounded: "full",
                },
                {
                    size: "2xl",
                    rounded: "full",
                },
                {
                    size: "xl",
                    rounded: "full",
                },
                {
                    size: "lg",
                    rounded: "full",
                },
                {
                    size: "md",
                    rounded: "full",
                },
                {
                    size: "sm",
                    rounded: "full",
                },
            ],
        },
        {
            title: "rounded",
            element: [
                {
                    size: "2xl",
                    rounded: "none",
                },
                {
                    size: "2xl",
                    rounded: "sm",
                },
                {
                    size: "2xl",
                    rounded: "md",
                },
                {
                    size: "2xl",
                    rounded: "lg",
                },
                {
                    size: "2xl",
                    rounded: "xl",
                },
                {
                    size: "2xl",
                    rounded: "2xl",
                },
                {
                    size: "2xl",
                    rounded: "full",
                }
            ],
        }
    ]





    return (
        <div className="p-8 scroll overflow-auto h-screen w-full">
            <div className='flex gap-3' >

                <button className='btn btn-sm btn-warning' onClick={() => router.push('/components')
                } >
                    Volver
                </button>
                <h1 className='font-bold text-3xl mb-5'>Avatar components</h1>
            </div>
            <div className='grid grid-cols-1 gap-5' >
                {Avatars.map((avatar) => (
                    <div key={avatar.title} className='grid grid-cols-1 gap-5' >
                        <h2 className='font-bold text-2xl'>{avatar.title}</h2>
                        <div className='flex flex-wrap items-center gap-5' >
                            {avatar.element.map((element, index) => (
                                <CustomCell.Avatar src={src} options={element} key={index} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
