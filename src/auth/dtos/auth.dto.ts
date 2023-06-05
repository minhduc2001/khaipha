import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ example: '0768368218' })
  @IsNotEmpty({ message: 'phone không được để trống' })
  @Transform(({ value }) => value && value.trim())
  @IsString()
  phone: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty({ message: 'USER011101' })
  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({ required: true, example: '123123' })
  // @IsNotEmpty({ message: 'USER011101' })
  @IsString()
  username: string;
}

export class CheckPhoneDto {
  @ApiProperty({ required: true, example: '0768368218' })
  @IsNotEmpty({ message: 'số điện thoại không được để trống' })
  @Transform(({ value }) => value && value.trim())
  @IsString()
  phone: string;
}
