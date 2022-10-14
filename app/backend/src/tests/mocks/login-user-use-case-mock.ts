import { ITokenPayload } from "../../adapters/token-hashing"
import { LoginUserRequestDTO, TokenDTO } from "../../DTOs"
import { LoginUser } from "../../use-cases"

export const loginUserUseCase = {
  async execute(data: LoginUserRequestDTO): Promise<TokenDTO> {
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