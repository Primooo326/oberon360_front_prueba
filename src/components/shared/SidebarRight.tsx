"use client";
import React from 'react'

export default function SidebarRight({ children, sidebarExpand = false, ...props }: { children: any, sidebarExpand?: boolean, [key: string]: any }) {

    return (
        <section className="flex h-full bg-transparent" data-theme="oberon">
            <div className={`h-full bg-base-100 ${sidebarExpand ? "border-l" : "border rounded-xl"}`}>
                <div className={`${props.className}`} >
                    {children}
                </div>
            </div>
        </section>
    )
}
