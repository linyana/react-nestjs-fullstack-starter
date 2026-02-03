export type ILoginRequestType = {
  email: string;
  password: string;
};

export type ILoginResponseType = {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
};
