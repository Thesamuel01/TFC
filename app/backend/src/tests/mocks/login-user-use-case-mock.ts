import { ITokenPayload } from "../../adapters/token-hashing"
import { LoginUserRequestDTO } from "../../DTOs"
import LoginUser, { LoginUserResponse } from "../../use-cases/login-user"

export const loginUserUseCase = {
  async execute(data: LoginUserRequestDTO): Promise<LoginUserResponse> {
    return {
      token: 'asdasdadad'
    }
  },
  validate(token: string): ITokenPayload {
    return {
      id: 1,
      role: 'admin',
      email: 'test@test.com',
    }
  },
} as LoginUser