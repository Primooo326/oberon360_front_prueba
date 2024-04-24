import type React from 'react';

export default function OperationFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="operation_bottom_container">
      <div className="operation_footer_actions">{children}</div>
    </div>
  );
}
