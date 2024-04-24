import type React from 'react';
import PrivateRoute from './PrivateRoute';



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <PrivateRoute>
    {children}
  </PrivateRoute>
}

