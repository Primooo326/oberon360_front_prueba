import React, { type ReactElement } from 'react';
import PrivateRoute from './PrivateRoute';

type LayoutProps = {
  children: ReactElement;
};

function DashboardLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default PrivateRoute(DashboardLayout);
