import type { CustomAvatar, CustomBadge, CustomButton, CustomCellAvatarProps, CustomCellBadgeProps, CustomCellButtonProps, CustomCellProps } from '@/models/customComponents.model';
import type React from 'react'

const Button = ({ children, options, ...props }: CustomCellButtonProps) => {

  const defaultOptions = {

    color: options.color ? `btn-${options.color}` : 'btn-primary',
    size: options.size ? `btn-${options.size}` : 'btn-md',
    rounded: options.rounded ? `rounded-${options.rounded}` : 'rounded-md',
    outline: options.outline ? options.outline : false,
    block: options.block ? options.block : false,
    iconPosition: options.iconPosition ? options.iconPosition : 'left',
    loader: options.loader ? options.loader : false,
    icon: options.icon ? options.icon : undefined,
    className: options.className ? options.className : ''

  }
  const className = `${defaultOptions.className} btn ${defaultOptions.size} ${defaultOptions.color} ${defaultOptions.rounded} ${defaultOptions.block ? 'btn-block' : ''} ${defaultOptions.outline ? 'btn-outline' : ''}`;

  return (
    <button
      className={className}
      {...props}>
      {defaultOptions.icon && defaultOptions.iconPosition === 'left' && defaultOptions.icon}
      {defaultOptions.loader && <span className='loading loading-spinner' />}
      {defaultOptions.icon && defaultOptions.iconPosition === 'right' && defaultOptions.icon}
      {children}
    </button>
  )
}
const Badge = ({ children, options, ...props }: CustomCellBadgeProps) => {
  const defaultOptions = {
    color: options.color ? `badge-${options.color}` : 'badge-primary',
    size: options.size ? `badge-${options.size}` : 'badge-md',
    outline: options.outline ? options.outline : false,
    iconPosition: options.iconPosition ? options.iconPosition : 'left',
    icon: options.icon ? options.icon : undefined,
    className: options.className ? options.className : ''
  };

  const className = `${defaultOptions.className} badge ${defaultOptions.size} ${defaultOptions.color} ${defaultOptions.outline ? 'badge-outline' : ''}`;

  return (
    <span className={className} {...props}>
      {defaultOptions.icon && defaultOptions.iconPosition === 'left' && <span className='me-1' >{defaultOptions.icon}</span>}
      {children}
      {defaultOptions.icon && defaultOptions.iconPosition === 'right' && <span className='ms-1' >{defaultOptions.icon}</span>}
    </span>
  );
}

const Avatar = ({ src, options, ...props }: CustomCellAvatarProps) => {

  let size = "size-8"

  switch (options.size) {
    case 'sm':
      size = 'size-8';
      break;
    case 'md':
      size = 'size-10';
      break;
    case 'lg':
      size = 'size-12';
      break;
    case 'xl':
      size = 'size-14';
      break;
    case '2xl':
      size = 'size-20';
      break;
    case '3xl':
      size = 'size-28';
      break;
    case '4xl':
      size = 'size-36';
      break;
    case '5xl':
      size = 'size-40';
      break;
    default:
      size = 'size-8';
      break;
  }

  let status = '';

  switch (options.status) {
    case 'online':
      status = 'online';
      break;
    case 'offline':
      status = 'offline';
      break;
    default:
      status = '';
      break;
  }

  const defaultOptions = {
    color: options.color ? `bg-${options.color}` : 'bg-primary',
    size: size,
    status: options.status ? `avatar ${options.status}` : '',
    rounded: options.rounded ? `rounded-${options.rounded}` : 'rounded-md',
    className: options.className ? options.className : '',
    label: options.label ? {
      text: options.label.text,
      color: options.label.color ? `text-${options.label.color}` : 'text-primary',
      size: options.label.size ? `text-${options.label.size}` : 'text-md',
      className: options.label.className ? options.label.className : ''

    } : undefined
  };


  const className = `${defaultOptions.className} avatar ${defaultOptions.size} ${defaultOptions.color} ${defaultOptions.status} ${defaultOptions.rounded} ${defaultOptions.label ? 'placeholder' : ''}`;

  return (
    <div className={`avatar ${size} ${status}`} {...props}>
      <img src={src} alt={src} className={className} />
      {options.label && <span className={`${defaultOptions.label!.className} ${defaultOptions.label!.size} ${defaultOptions.label!.color}`}>{defaultOptions.label!.text}</span>}
    </div>

  );
}

const Container = ({ children, ...props }: CustomCellProps) => {
  return <div {...props}>{children}</div>;
}

export default function CustomCell({ children, ...props }: CustomCellProps) {
  return <div {...props}>{children}</div>;
}


CustomCell.Button = Button;
CustomCell.Badge = Badge;
CustomCell.Avatar = Avatar;
CustomCell.Container = Container;