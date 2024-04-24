"use client"
import React, { useState } from 'react';
import { Layout, Popover } from 'antd';
import Link from 'next/link';
import OperationLayoutComponent from '@components/i+c/layout/Operation';
import HelmetTitle from '@components/i+c/ui/HelmetTitle';
import { EModules } from '@/models/i+c/Modules';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

const { Sider } = Layout;

export default function OperationHomeDashboard() {
  const [openDialogLogout, setOpenDialogLogout] = useState(false);
  // const userInfo = useAppSelector(selectUserInfo);
  const { userInfo } = useICAuthStore()

  const hide = () => {
    setOpenDialogLogout(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpenDialogLogout(newOpen);
  };

  return (
    <OperationLayoutComponent>
      <HelmetTitle title="Inicio" />

      <Sider id={'operation_navbar_custom'}>
        <div className="sidebar_menu">
          <div className="top_menu">
            <div className="logo" />
            <div className="items">
              {userInfo?.permissions?.find(permission => permission.moduleId === EModules.REQUESTS) && (
                <div className="item_menu">
                  <Link href="/I+C/dashboard/operation/request">
                    <div id="request" />
                    <span>Solicitud</span>
                  </Link>
                </div>
              )}
              <div className="item_menu">
                <Popover
                  content={
                    <div className="pop_items">
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.STUDIES) && (
                        <Link
                          href="/I+C/dashboard/operation/studies"
                          className="pop_item_menu"
                        >
                          <span>Estudios</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.HISTORY_OF_SERVICES) && (
                        <Link
                          href="/I+C/dashboard/operation/historical"
                          className="pop_item_menu"
                        >
                          <span>Historico de servicios</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.BASIC_CONSULTATION) && (
                        <Link
                          href="/I+C/dashboard/operation/search"
                          className="pop_item_menu"
                        >
                          <span>Consulta básica</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.QA) && (
                        <Link
                          href="/I+C/dashboard/operation/qa"
                          className="pop_item_menu"
                        >
                          <span>QA</span>
                        </Link>
                      )}
                    </div>
                  }
                  placement="right"
                >
                  <div id="operation" />
                  <span>Operación</span>
                </Popover>
              </div>
              <div className="item_menu">
                <div id="reports" />
                <span>Informe</span>
              </div>
              <div className="item_menu">
                <Popover
                  content={
                    <div className="pop_items">
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.PARAMETRIC_LISTS) && (
                        <Link
                          href="/I+C/dashboard/operation/parameters/lists"
                          className="pop_item_menu"
                        >
                          <span>Listas Parametricas</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.OPERATIONAL_GROUPS) && (
                        <Link
                          href="/I+C/dashboard/operation/parameters/groups"
                          className="pop_item_menu"
                        >
                          <span>Grupos Operativos</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.USERS) && (
                        <Link
                          href="/I+C/dashboard/operation/parameters/users"
                          className="pop_item_menu"
                        >
                          <span>Usuarios</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.ROLES) && (
                        <Link
                          href="/I+C/dashboard/operation/parameters/roles"
                          className="pop_item_menu"
                        >
                          <span>Roles</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.CUSTOMER_PARAMETERS) && (
                        <Link
                          href="/I+C/dashboard/operation/parameters/customers"
                          className="pop_item_menu"
                        >
                          <span>Clientes</span>
                        </Link>
                      )}
                      {userInfo?.permissions?.find(permission => permission.moduleId === EModules.CUSTOMER_PARAMETERS) && (
                        <Link
                          href="/I+C/dashboard/operation/parameters/clients"
                          className="pop_item_menu"
                        >
                          <span>Parámetros clientes</span>
                        </Link>
                      )}
                    </div>
                  }
                  placement="right"
                >
                  <div id="parameters" />
                  <span>Parametros</span>
                </Popover>
              </div>
            </div>
          </div>
          <div className="m_signout">
            <Popover
              content={
                <div className="logout_confirmation_container">
                  <span>¿Esta seguro de cerrar sesión?</span>

                  <div className="buttons">
                    <div className="cancel_action" onClick={hide}>
                      <span>Cancelar</span>
                    </div>

                    <Link href="/I+C/auth/logout">
                      <div className="confirm_action">
                        <span>Aceptar</span>
                      </div>
                    </Link>
                  </div>
                </div>
              }
              placement="right"
              trigger="click"
              open={openDialogLogout}
              onOpenChange={handleOpenChange}
            >
              <div id="signout" />
            </Popover>
          </div>
        </div>
      </Sider>
      <div className="center_logo" />
    </OperationLayoutComponent>
  );
}
