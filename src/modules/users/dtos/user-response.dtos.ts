import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseUserDto } from 'src/modules/users/dtos/base-user.dto';

export class CreateOneUserResponseDto extends PickType(BaseUserDto, [
    'id',
    'name',
] as const) {}

export class UpdateOneUserResponseDto extends PickType(BaseUserDto, [
    'id',
    'name',
] as const) {}

export class FindOneUserResponseDto extends PickType(BaseUserDto, [
    'id',
    'name',
] as const) {}

export class LoginResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    accessToken: string;
}
