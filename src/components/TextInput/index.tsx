import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface ITextInputProps {
  id: string
  label: string
  name: string
  type?: string
  required?: boolean
  variant?: 'standard' | 'filled' | 'outlined'
}

export function TextInput({
  id,
  label,
  name,
  type,
  required,
  variant,
}: ITextInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue={null}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={id}
          label={label}
          type={type}
          required={required}
          variant={variant}
        />
      )}
    />
  )
}
