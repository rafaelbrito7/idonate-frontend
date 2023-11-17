import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'

interface IFloatNumberInputProps {
  id: string
  label: string
  name: string
  required?: boolean
  variant?: 'standard' | 'filled' | 'outlined'
}

export function FloatNumberInput({
  id,
  label,
  name,
  required,
  variant,
}: IFloatNumberInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue={0}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={id}
          label={label}
          type="number"
          required={required}
          variant={variant}
        />
      )}
    />
  )
}
