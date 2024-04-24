import React, { type ReactElement } from 'react';

export default function OperationFooter({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <div className="operation_bottom_container">
      <div className="operation_footer_actions">{children}</div>
    </div>
  );
}
