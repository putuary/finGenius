export interface IRegsiter {
  email: string | null | undefined;
  password: string | null | undefined;
  fullname: string | null | undefined;
}

export interface ILogin {
  email: string | null | undefined;
  password: string | null | undefined;
}

export interface IResLogin {
  accessToken: string;
  refreshToken: string;
}

export interface IResRefreshToken {
  accessToken: string;
}
