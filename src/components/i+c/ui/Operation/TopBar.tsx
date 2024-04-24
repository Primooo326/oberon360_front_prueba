import Link from 'next/link';
import type React from 'react';
import UserAvatar from '../UserAvatar';

export default function OperationTopBar({
  title,
  children,
  path = '/',
}: {
  title: string;
  children?: React.ReactNode;
  path?: string;
}) {
  return (
    <div
      className="operation_top_container"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="operation_header">
        <Link
          href={`/I+C/dashboard/operation${path}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div className="operation_logo" />
          <h4>{title}</h4>
        </Link>
      </div>
      <div className="operation_actions">
        {children}
        <UserAvatar sizeAvatar={45} />
      </div>
    </div>
  );
}
