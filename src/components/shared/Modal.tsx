import React from 'react'
import "@/styles/components/shared/modal.scss"
export default function Modal({ children, id, ...props }: { children: any; id: string, [key: string]: any }) {


    return (
        <section id={id} className='modale' >
            <div className={`modal-content ${props.className}`} >
                {children}
            </div>
        </section>
    )
}
