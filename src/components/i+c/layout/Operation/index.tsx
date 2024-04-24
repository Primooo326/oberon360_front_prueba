import React, { type ReactElement } from 'react';
import { Layout } from 'antd';
import PrivateRoute from '../PrivateRoute';

const { Content } = Layout;

function OperationLayoutComponent({ children }: { children: ReactElement }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content>
          <section className="operation_layout">{children}</section>
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrivateRoute(OperationLayoutComponent);
