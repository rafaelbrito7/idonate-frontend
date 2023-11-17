import { CurrencyInput } from 'react-currency-mask'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'

type ICustomCurrencyInputProps = {
  id: string
  label: string
  name: string
  required?: boolean
  variant?: 'standard' | 'filled' | 'outlined'
}

export function CustomCurrencyInput({
  id,
  name,
  label,
  required,
  variant,
}: ICustomCurrencyInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CurrencyInput
          value={field.value}
          onChangeValue={(_, value) => {
            field.onChange(value)
          }}
          InputElement={
            <TextField
              placeholder="R$0,00"
              name={name}
              id={id}
              label={label}
              required={required}
              variant={variant}
            />
          }
        />
      )}
    />
  )
}
