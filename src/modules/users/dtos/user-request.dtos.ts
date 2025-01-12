import { PartialType, PickType } from '@nestjs/swagger';
import { BaseUserDto } from 'src/modules/users/dtos/base-user.dto';

export class CreateUserDto extends PickType(BaseUserDto, [
    'name',
    'password',
] as const) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginDto extends CreateUserDto {}
