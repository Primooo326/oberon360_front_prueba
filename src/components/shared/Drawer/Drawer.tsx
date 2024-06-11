"use client"
import { FaMoon, FaSun } from "react-icons/fa6";
import { HiOutlineMap } from "react-icons/hi2";
import { PiBell } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { useSystemStore } from "@/states/System.state";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { LuUserCog2 } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FiltrosTelemetria from "./DrawerContents/MapaContent/FiltrosTelemetria";
import ParametrosContent from "./DrawerContents/ParametrosContent";
import SubmenuDrawerContainer from "./SubmenuDrawerContainer";
import { FaUserNurse } from "react-icons/fa6";
import MapaContent from "./DrawerContents/MapaContent/MapaContent";
interface SubMenu {
  title: string;
  icon: JSX.Element;
  component?: JSX.Element;
  href?: string;
}
interface Modulos {
  title: string;
  submenus: SubMenu[];
}

export default function Drawer() {
  const { theme, setTheme, showDrawer, setShowDrawer, itemDrawer, setItemDrawer } = useSystemStore();
  const router = useRouter();
  const pathname = usePathname();

  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenu | null>(null);

  const subMenus: SubMenu[] = [
    {
      title: "Mapa Operativo",
      icon: <HiOutlineMap className="w-6 h-auto" />,
      href: "/dashboard",
      component: (
        <SubmenuDrawerContainer canClose={false} title="Mapa Operativo">
          <MapaContent />
        </SubmenuDrawerContainer>
      ),
    },
    {
      title: "Novedades",
      icon: <PiBell className="w-6 h-auto" />,
      href: "/novedades",
    },
    {
      title: "Asistencia",
      icon: <FaUserNurse className="w-6 h-auto" />,
      href: "/asistencia",
    },
    {
      title: "Parámetros",
      icon: <LuUserCog2 className="w-6 h-auto" />,
      component: (
        <SubmenuDrawerContainer title="Parámetros">
          <ParametrosContent />
        </SubmenuDrawerContainer>
      ),
    },
  ];



  useEffect(() => {


    if (showDrawer) {
      const subMenu = subMenus.find((subMenu) => subMenu.title === itemDrawer);
      if (subMenu) {
        setCurrentSubMenu(subMenu);
      }
    }
    // if (pathname === '/dashboard') {
    //   setCurrentSubMenu(subMenus[0])
    // }

  }, [itemDrawer, showDrawer]);

  const styleSubmenu =
    "p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100";
  const styleSubmenuHover =
    "p-1.5 text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg";
  return (
    <section className="flex">
      <div className="flex flex-col justify-between z-10 w-16 h-screen bg-base-100 py-8 border-r">
        <div className="flex flex-col items-center space-y-8">
          <Image
            src="/OBERON-DEGRADADO.png"
            alt="logo oberon"
            width={48}
            height={48}
          />

          {subMenus.map((subMenu, index) => (
            <div
              key={index}
              className="tooltip tooltip-right"
              data-tip={subMenu.title}
            >
              <button
                className={
                  pathname === subMenu.href ? styleSubmenuHover : styleSubmenu
                }
                onClick={() => {
                  if (subMenu.href) {
                    router.push(subMenu.href);
                  }
                  if (subMenu.component) {
                    setCurrentSubMenu(subMenu)
                    setShowDrawer(true)
                    setItemDrawer(subMenu.title)
                  } else {
                    setShowDrawer(false)

                  }
                }}
              >
                {subMenu.icon}
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-6">

          <button
            className={styleSubmenu}
            onClick={() =>
              theme === "oberon" ? setTheme("dark") : setTheme("oberon")
            }
          >
            {theme === "oberon" ? (
              <div className="tooltip tooltip-right" data-tip="Modo oscuro">
                <FaMoon className="w-6 h-auto text-blue-800" />
              </div>
            ) : (
              <div className="tooltip tooltip-right" data-tip="Modo claro">
                <FaSun className="w-6 h-auto" />
              </div>
            )}
          </button>
          <button className={styleSubmenu}>
            <FiSettings className="w-6 h-auto" />
          </button>
        </div>
      </div>
      {/* <AnimatePresence>
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
            </AnimatePresence> */}
      <AnimatePresence>
        {showDrawer && currentSubMenu && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "linear", stiffness: 200 }}
            className="sidebar"
          >
            {currentSubMenu.component}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
