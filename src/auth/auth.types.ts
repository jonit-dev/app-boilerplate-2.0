export interface IJwtPayload {
  email: string;
}

export interface IAuthGranted {
  accessToken: string;
}

export enum AuthTranslationKeys {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}
