"use client"
import Link from 'next/link';
import Image from 'next/image';
import DashboardLayout from '@/components/i+c/layout/DashboardLayout';
import Loading from '@/components/i+c/ui/Loading';
import HelmetTitle from '@/components/i+c/ui/HelmetTitle';
import UserAvatar from '@/components/i+c/ui/UserAvatar';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

export default function CandidatesDashboard() {
  const { userInfo } = useICAuthStore()

  return (
    <DashboardLayout>
      <HelmetTitle title="Bienvenida" />

      {userInfo ? (
        <main className="section_welcome">
          <div className="top_header">
            <div className="container_logo">
              <div className="top_logo" />
            </div>
            <div className="user_info">
              <UserAvatar needChangePassword />
            </div>
          </div>

          <div className="main_container">
            <h1>BIENVENID@</h1>
            <h2>{userInfo!.name}</h2>
            <div className="nav_buttons">
              <Link href="/I+C/dashboard/candidates/information/step1">
                <div className="nav_item">
                  <Image
                    src="/assets/images/icons/INFO.png"
                    height={100}
                    width={100}
                    alt="info-action"
                    className="action_nav"
                  />
                  <p>Mi Información</p>
                </div>
              </Link>
              <Link href="/I+C/dashboard/candidates/calendar">
                <div className="nav_item">
                  <Image
                    src="/assets/images/icons/CALENDARIO.png"
                    height={100}
                    width={100}
                    alt="calendar-action"
                    className="action_nav"
                  />
                  <p>Mi Calendario</p>
                </div>
              </Link>

              <Link href="/I+C/dashboard/candidates/process">
                <div className="nav_item">
                  <Image
                    src="/assets/images/icons/PROCESO.png"
                    height={100}
                    width={100}
                    alt="process-action"
                    className="action_nav"
                  />
                  <p>Mi Proceso</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </DashboardLayout>
  );
}
