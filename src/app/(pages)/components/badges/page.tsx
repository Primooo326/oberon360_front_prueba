"use client"
import CustomCell from "@/components/shared/Table/CustomCell";
import type { CustomBadge } from "@/models/customComponents.model";
import { useRouter } from "next/navigation";
import  {FaRegHeart} from "react-icons/fa"


export default function page() {
    const router = useRouter();

    const badges: { title: string, element: CustomBadge[] }[] = [
        {
            title: 'Base',
            element: [
                { color: 'primary', },
                { color: 'secondary', },
                { color: 'accent', },
                { color: 'neutral', },
                { color: 'warning', },
                { color: 'error', },
                { color: 'success', },
            ]
        },
        {
            title: "Outline",
            element: [
                { color: 'primary', outline: true },
                { color: 'secondary', outline: true },
                { color: 'accent', outline: true },
                { color: 'neutral', outline: true },
                { color: 'warning', outline: true },
                { color: 'error', outline: true },
                { color: 'success', outline: true },
            ]
        },
        {
            title: 'Icon Start',
            element: [
                { color: 'primary', icon: <FaRegHeart />, iconPosition: 'left' },
                { color: 'secondary', icon: <FaRegHeart />, iconPosition: 'left' },
                { color: 'accent', icon: <FaRegHeart />, iconPosition: 'left' },
                { color: 'neutral', icon: <FaRegHeart />, iconPosition: 'left' },
                { color: 'warning', icon: <FaRegHeart />, iconPosition: 'left' },
                { color: 'error', icon: <FaRegHeart />, iconPosition: 'left' },
                { color: 'success', icon: <FaRegHeart />, iconPosition: 'left' },
            ]
        },
        {
            title: 'Icon End',
            element: [
                { color: 'primary', icon: <FaRegHeart />, iconPosition: 'right' },
                { color: 'secondary', icon: <FaRegHeart />, iconPosition: 'right' },
                { color: 'accent', icon: <FaRegHeart />, iconPosition: 'right' },
                { color: 'neutral', icon: <FaRegHeart />, iconPosition: 'right' },
                { color: 'warning', icon: <FaRegHeart />, iconPosition: 'right' },
                { color: 'error', icon: <FaRegHeart />, iconPosition: 'right' },
                { color: 'success', icon: <FaRegHeart />, iconPosition: 'right' },
            ]
        },
        {
            title: 'Sizes',
            element: [
                { color: 'primary', size: 'sm' },
                { color: 'primary', size: 'md' },
                { color: 'primary', size: 'lg' },
            ]
        }
    ]

    return (
        <div className="p-8 scroll overflow-auto h-screen w-full">
            <div className='flex gap-3' >

                <button className='btn btn-sm btn-warning' onClick={() => router.push('/components')
                } >
                    Volver
                </button>
                <h1 className='font-bold text-3xl mb-5'>Badge components</h1>
            </div>
            <div className='grid grid-cols-1 gap-5' >
                {badges.map((badge) => (
                    <div key={badge.title} >
                        <h2 className='font-bold text-xl mb-5'>{badge.title}</h2>
                        <div className='flex flex-wrap gap-5' >
                            {badge.element.map((element, index) => (
                                <CustomCell.Badge key={index} options={element}>{String(element.color)}</CustomCell.Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
