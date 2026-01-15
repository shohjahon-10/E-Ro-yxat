export type TLogin = {
  login: string;
  password: string;
};

export type TVerifyPassword = {
  email: string;
  confirm_code: string;
};

export type TResponse = {
  error?: string;
  message: string | string[];
  statusCode?: number;
};

export type TResetPasswordData = {
  newPassword: string;
  confirmPassword: string;
};

export type TVerifyEmailByData = {
  email: string;
  confirm_code: string;
  newPassword: string;
};

export type TSelectOption = {
  value: string | number;
  label: string;
};

export type TSelectUserOptioAsImage = TSelectOption & {
  photo: string;
  roles: string;
  sub_roles?: string[];
  value: number | string;
  label: string;
};
