"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, Button, Dropdown, Form, Input, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd/lib';
import { updatePassword } from '@/api/i+c/Users';
import { showError, showSuccess } from './Toast';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

export default function UserAvatar({
  sizeAvatar = 64,
  needChangePassword = false,
}: {
  sizeAvatar?: number;
  needChangePassword?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const { userInfo } = useICAuthStore()

  const items: MenuProps['items'] = [
    {
      label: (
        <>
          <div className="info">
            <h4>{userInfo?.role}</h4>
          </div>
          <div
            className="paths"
            style={!needChangePassword ? { justifyContent: 'flex-end' } : {}}
          >
            {needChangePassword && (
              <Button
                type="link"
                style={{ padding: 0, marginRight: '15px' }}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="action"> CAMBIO DE CONTRASEÑA</span>
              </Button>
            )}
            <Link
              href="/I+C/auth/logout"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span className="action">CERRAR SESIÓN</span>
            </Link>
          </div>
        </>
      ),
      key: 0,
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    setLoadingButton(true);
    updatePassword(values)
      .then((res) => {
        if (res) {
          showSuccess(res.data);
          setIsModalOpen(false);
        }
        setLoadingButton(false);
      })
      .catch((err) => {
        setLoadingButton(false);
        showError(err.response ? err.response.data.error : err);
      });
  };

  return (
    <>
      <div className="user_info">
        <Dropdown menu={{ items }} trigger={['click']}>
          <div className='flex gap-2 items-center cursor-pointer' >
            <Avatar
              style={{ background: '#fff' }}
              size={sizeAvatar}
              icon={<UserOutlined style={{ color: '#0c366e' }} />}
            />
            <div>

              <h1 className='text-white text-lg' >
                {userInfo?.name} {userInfo?.lastName}
              </h1>
              <span className='text-white ' >
                ({userInfo?.role || "Candidato"})
              </span>
            </div>
          </div>
        </Dropdown>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        style={{ maxWidth: 320 }}
      >
        <div className="form_container">
          <Form
            name="restore-password"
            initialValues={{
              currentPassword: '',
              password: '',
              confirmationPassword: '',
            }}
            onFinish={onFinish}
          >
            <div className="title_modal">
              <h2>Cambiar mi contraseña</h2>
            </div>
            <Form.Item
              label="Contraseña Actual"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: 'Ingresa tú contraseña!',
                },
              ]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <Form.Item
              label="Nueva Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Ingresa tú contraseña!',
                },
              ]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <Form.Item
              label="Confirmar Contraseña"
              name="confirmationPassword"
              rules={[
                {
                  required: true,
                  message: 'Ingresa tú contraseña!',
                },
                ({ getFieldValue }: any) => ({
                  validator(_: any, value: any) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Las contraseñas no coinciden!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="small" placeholder="Contraseña" />
            </Form.Item>

            <div className="footer_action">
              <Button
                className="button_action"
                type="primary"
                htmlType="button"
                onClick={handleCancel}
                danger
              >
                Cancelar
              </Button>

              <Button
                className="button_action confirm"
                type="primary"
                htmlType="submit"
                loading={loadingButton}
              >
                Cambiar
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
