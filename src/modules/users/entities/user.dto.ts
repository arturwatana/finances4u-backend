import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserDTO = z.object({
  email: z.string({
    required_error: 'email is required',
  }),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(6),
  name: z.string({
    required_error: 'name is required',
  }),
});

export class CreateUserSchemaDTO extends createZodDto(CreateUserDTO) {}
