"use client"
import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import packageJson from '../../package.json';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import type { LoginFieldType } from '@/models/i+c/FormTypes';
import { authenticateUser } from '@/api/i+c/Authentication';
// import { useAppDispatch } from '@/redux/hooks';
// import { setAuthToken, setScope } from '@/redux/slices/auth';
import { showError } from '@components/i+c/ui/Toast';
import HelmetTitle from '@components/i+c/ui/HelmetTitle';
import { ScopesApp } from '@/models/i+c/scopesApp.model';
import { useRouter } from "next/navigation"
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

// const version = packageJson.version;

export default function LoginPage() {
  const [loadingButton, setLoadingButton] = useState(false);
  const { setAuthToken, setScope } = useICAuthStore()
  const router = useRouter();

  function onFinish(values: LoginFieldType) {
    setLoadingButton(true);
    authenticateUser(values)
      .then((res) => {
        if (res) {
          console.log(res);
          setAuthToken(res.data.token);
          setScope(res.data.scope);

          res.data.scope === ScopesApp.CANDIDATE
            ? router.push('/I+C/dashboard/candidates')
            : router.push('/I+C/dashboard/operation');
        } else {
          showError('Credenciales incorrectas');
        }
        setLoadingButton(false);
      })
      .catch((err) => {
        console.log(err);

        showError(
          err.response
            ? err.response.data.error
            : 'Error al tratar de iniciar sesión'
        );
        setLoadingButton(false);
      });
  }

  return (
    <>
      <HelmetTitle title="Iniciar Sesión" />
      <main className="login_container">
        <div className="logo_header" />
        <div className="main">
          <div className="version_tag">
            {/* <span>{`Número de compilación de la aplicación V${version}`}</span> */}
          </div>
          <div className="container">
            <div className="container_box">
              <div className="login_box">
                <div className="section_login">
                  <div className="logo" />
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                      username: '',
                      password: '',
                      remember: false,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item<LoginFieldType>
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: 'Ingresa tu usuario!',
                        },
                      ]}
                    >
                      <Input
                        className="login_input"
                        prefix={<UserOutlined />}
                        placeholder="Usuario"
                      />
                    </Form.Item>

                    <Form.Item<LoginFieldType>
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Ingresa las credenciales!',
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Contraseña"
                      />
                    </Form.Item>

                    <Form.Item<LoginFieldType>
                      name="remember"
                      valuePropName="checked"
                    >
                      <div className="row_actions">
                        <Checkbox>Recordarme</Checkbox>
                        <Link href="/I+C/auth/forgot-password">
                          Recordar mi contraseña
                        </Link>
                      </div>
                    </Form.Item>

                    <Form.Item className="custom_button">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingButton}
                      >
                        INGRESAR
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
