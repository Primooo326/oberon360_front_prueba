import type React from 'react'
import type { CustomButton } from '@/models/customComponents/button.model';

interface CustomCellButtonProps {
  options: CustomButton,
  children: React.ReactNode,
  [key: string]: any
}
interface CustomCellAvatarProps {
  onClick: () => void;
  data: {
    srcImg: string;
    name: string;
  }
  className: string;
  [key: string]: any;
}

interface CustomCellProps {
  id: string,
  children: React.ReactNode,
  [key: string]: any
}

const Button = ({ children, ...props }: CustomCellButtonProps) => {
  return (
    <button
      className={`btn ${props.options.size} ${props.options.color} ${props.options.rounded} ${props.options.block ? 'btn-block' : ''} ${props.options.outline ? 'btn-outline' : ''}`}
      {...props}>
      {props.options.icon && props.options.iconPosition === 'left' && props.options.icon}
      {props.options.loader && <span className='loading loading-spinner' />}
      {props.options.icon && props.options.iconPosition === 'right' && props.options.icon}
      {children}
    </button>
  )
}

const Avatar = ({ onClick, data, className, ...props }: CustomCellAvatarProps) => {
  return (
    <div className='flex items-center gap-2 cursor-pointer' onClick={onClick} >
      <img src={data.srcImg} alt={data.name} className="rounded-full h-10 w-10" />
      <span className='underline text-primary' >{data.name}</span>
    </div>
  )
}

export default function CustomCell({ id, children, ...props }: CustomCellProps) {
  return <div id={id}>{children}</div>;
}

CustomCell.Button = Button;
CustomCell.Avatar = Avatar;