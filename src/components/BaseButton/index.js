import Button from '@mui/material/Button'
import clsx from 'clsx'
import React, { memo } from 'react'

import useStyles from './styles'

const BaseButton = ({
  title = 'Add',
  type = 'button',
  variant = 'contained',
  color = 'primary',
  className,
  disabled,
  icon,
  isDefault,
  children,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <Button
      {...rest}
      variant={variant}
      className={clsx(classes.button, isDefault && classes.default, className)}
      type={type}
      color={color}
      disabled={disabled}
    >
      {icon}
      <span>{title}</span>
      {children}
    </Button>
  )
}

export default memo(BaseButton)
