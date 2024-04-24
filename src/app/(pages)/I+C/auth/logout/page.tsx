"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { showError } from '@/components/i+c/ui/Toast';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';
import { useICCandidatesStore } from '@/states/i+c/I+C-candidates.state';

export default function Logout() {
  const token = Cookies.get('token');
  const router = useRouter();
  const { logoutApp } = useICAuthStore()
  const { clearCandidatesStore } = useICCandidatesStore()
  useEffect(() => {
    logoutApp()
    clearCandidatesStore()
    router.push('/I+C/auth');
    if (!token) {
      showError('La sesión ha expirado');
    }
  }, [router]);

  return <></>;
}
