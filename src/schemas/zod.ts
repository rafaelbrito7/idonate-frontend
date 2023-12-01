import * as zod from 'zod'

export const loginFormValidationSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
})
