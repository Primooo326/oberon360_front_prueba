import type React from 'react';
import { Layout } from 'antd';
import PrivateRoute from '../PrivateRoute';

const { Content } = Layout;

export default function OperationLayoutComponent({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content>
          <PrivateRoute>
            <section className="operation_layout">{children}</section>
          </PrivateRoute>
        </Content>
      </Layout>
    </Layout>
  );
}

