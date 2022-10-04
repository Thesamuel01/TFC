export interface ITokenPayload {
  id: number;
  role: string;
  email: string;
}

export interface TokenResult {
  value: ITokenPayload | null,
  isValid: boolean,
  isExpired?: boolean,
}

export interface TokenHashing {
  generate(payload: ITokenPayload): string;
  validate(token: string): TokenResult | void;
}
