import { Button, Card } from 'antd';
import Link from 'next/link';
import type { EModules } from '@/models/i+c/Modules';
import { useICAuthStore } from '@/states/i+c/I+C-auth.state';

type ACLModulesProps = {
  requiredPermission: EModules;
  children: React.ReactNode;
};

export default function ACLModules({
  requiredPermission,
  children,
}: ACLModulesProps) {
  const { userInfo } = useICAuthStore()

  const hasPermission = userInfo!.permissions?.find((permission: any) => permission.moduleId === requiredPermission);

  if (hasPermission) {
    return children;
  }
  return (
    <div className='not-allow'>
      <Card>
        <div>
          <div className="not-allow-label-section">
            <h3>Error 401</h3>
            <span className="alert">NO TIENES PERMISOS PARA ESTE MODULO</span>
          </div>
          <Link href="/I+C/dashboard/operation" style={{ width: '100%' }}>
            <Button
              htmlType="button"
              danger
              className="operation_modal_button cancel_button"
            >
              REGRESAR
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
