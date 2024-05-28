import { FaMoon, FaSun } from "react-icons/fa6"
import { CgHome } from "react-icons/cg";
import { PiBell } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { useSystemStore } from "@/states/System.state";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import FiltrosSubmenu from "./DrawerContents/FiltrosContent";
import SubmenuContainer from "./DrawerContents/SubmenuContainer";
interface SubMenu {
    title: string;
    icon: JSX.Element;
    component: JSX.Element;
    href: string;
}

export default function Drawer() {
    const { theme, setTheme, showDrawer } = useSystemStore()
    const router = useRouter()
    const pathname = usePathname()
    const subMenus = [
        {
            title: "Inicio",
            icon: <CgHome className="w-6 h-auto" />,
            href: "/dashboard",
            component:
                <SubmenuContainer title='Inicio'>

                    <div> hola </div>
                </SubmenuContainer>
        },
        {
            title: "Novedades",
            icon: <PiBell className="w-6 h-auto" />,
            href: "/novedades",
            component: <SubmenuContainer title='Novedades'>
                <div>Novedades</div>
            </SubmenuContainer>
        },
        {
            title: "Investigación y Riesgos",
            icon: <IoSearchOutline className="w-6 h-auto" />,
            href: "/I+C/auth",
            component: <SubmenuContainer title='Investigación y Riesgos'>

                <div>Investigación y Riesgos</div>
            </SubmenuContainer>
        }
    ]


    const styleSubmenu = "p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
    const styleSubmenuHover = "p-1.5 text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg"
    return (
        <section className="flex">
            <div className="flex flex-col justify-between z-10 w-16 h-screen bg-base-100 py-8 border-r">
                <div className="flex flex-col items-center space-y-8" >

                    <Image src="/OBERON-DEGRADADO.png" alt="logo oberon" width={48} height={48} />


                    {subMenus.map((subMenu, index) => (
                        <div key={index} className="tooltip tooltip-right" data-tip={subMenu.title}>
                            <button onClick={() => {
                                router.push(`${subMenu.href}`)
                            }} className={pathname === subMenu.href ? styleSubmenuHover : styleSubmenu} >

                                {subMenu.icon}

                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center space-y-8" >

                    <button className={styleSubmenu} onClick={() => theme === "oberon" ? setTheme("dark") : setTheme("oberon")} >
                        {theme === "oberon" ?
                            <div className="tooltip tooltip-right" data-tip="Modo oscuro">

                                <FaMoon className="w-6 h-auto text-blue-800" />
                            </div>
                            :
                            <div className="tooltip tooltip-right" data-tip="Modo claro">

                                <FaSun className="w-6 h-auto" />
                            </div>
                        }
                    </button>
                    <button className={styleSubmenu}>
                        <FiSettings className="w-6 h-auto" />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {showDrawer && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'linear', stiffness: 200 }}
                        className="sidebar"
                    >
                        <SubmenuContainer title="Filtros Avanzados">
                            <FiltrosSubmenu />
                        </SubmenuContainer>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    )
}
