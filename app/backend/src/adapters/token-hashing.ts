export interface ITokenPayload {
  id: number;
  role: string;
  email: string;
}

export interface TokenHashing {
  generate(payload: ITokenPayload): string;
  validate(token: string): ITokenPayload | null;
}
