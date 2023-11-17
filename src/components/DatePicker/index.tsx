import { DatePicker } from '@mui/x-date-pickers'
import { Controller, useFormContext } from 'react-hook-form'

interface IMUDatePicker {
  name: string
  label: string
  required?: boolean
  maxDate?: Date
}

export function MUDatePicker({
  name,
  label,
  required,
  maxDate,
}: IMUDatePicker) {
  const { control } = useFormContext()

  return (
    <>
      <Controller
        name={name}
        defaultValue={null}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <DatePicker
            label={label}
            onChange={(date) => {
              field.onChange(date)
            }}
            maxDate={maxDate}
          />
        )}
      />
    </>
  )
}
