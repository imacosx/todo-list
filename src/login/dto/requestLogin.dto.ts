import { IsEmail, IsNotEmpty } from "class-validator";

export class RequestLoginDto {
    @IsEmail({}, {message:'El correo electronico no es valido'})
    @IsNotEmpty({message:'El correo electronico es requerido'})
    email: string;


    @IsNotEmpty({message:'La contraseña es requerida'})
    password: string;


}