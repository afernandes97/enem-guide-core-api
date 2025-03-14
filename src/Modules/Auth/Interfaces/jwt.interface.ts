export interface JwtPayload {
  id?: string;
  sub: string;
  email: string;
  name: string;
  accessToken: string;
}

export interface JwtTokenData {
  secret: string;
}
