"use client"
import { useRouter } from "next/navigation"

export default function Page() {

    const router = useRouter();

    const pages = [
        {
            title: 'buttons',
            href: "/components/buttons"
        },
        {
            title: "badges",
            href: "/components/badges"
        },
        {
            title: "avatar",
            href: "/components/avatar"
        }
    ]

    return (
        <div className="p-8" >
            <h1 className="font-bold text-xl mb-5">Welcome to components!!!!</h1>

            <ul className="menu bg-base-200 rounded-box">
                {pages.map((page) => (
                    <li key={page.title}>
                        <a onClick={() => router.push(page.href)} >{page.title}</a>
                    </li>
                ))}
            </ul>

        </div>
    );
}

