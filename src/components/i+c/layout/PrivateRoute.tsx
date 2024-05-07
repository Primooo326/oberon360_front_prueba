"use client"
import type React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/i+c/ui/Loading';
import Cookies from 'js-cookie';
import { validateSession } from '@/api/i+c/Authentication';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const token = Cookies.get('token');
  const router = useRouter();
  const { setUserInfo } = useICAuthStore()
  useEffect(() => {
    if (token) {
      validateSession()
        .then((res) => {
          if (res) {
            console.log("res:", res.data);
            setUserInfo(res.data)
            setIsLogged(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      router.push('/I+C/auth/logout');
    }
  }, [isLogged, token, router]);

  return (
    <>
      {isLogged ? children : <Loading />}

    </>
  );
}
