import { PartialType } from '@nestjs/swagger';
import { CreateUserDto, CreateOneUserResponseDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateOneUserResponseDto extends CreateOneUserResponseDto {}
