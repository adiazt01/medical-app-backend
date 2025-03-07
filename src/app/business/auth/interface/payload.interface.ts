import { Role } from "@prisma/client";

export interface IPayloadToken {
    email: string,
    sub: number,
    role: Role,
    firstNames: string,
    lastNames: string,
    cartId: number,
}