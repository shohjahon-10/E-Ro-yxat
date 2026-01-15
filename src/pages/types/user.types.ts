export interface TUser {
  id: number;
}
export type TUserSignInResponse = {
  access_token: string;
  refresh_token: string;
  user: TUser;
  role?: string | null;
  roles?: string | null;
};
export type TUserStore = {
  user: TUser | null;
  confirm_code: string;
  email: string;
  setConfirmCode: (str: string) => void;
  setEmail: (str: string) => void;
  setUserData: (data: TUserSignInResponse) => void;
  setUser: (user: TUser) => void;
  logOut: () => void;
};

export interface TUser {
  avatar: string;
  createdAt: string;
  created_author: TCreated_Author[];
  domain: string;
  fullname: string;
  id: number;
  is_active: boolean;
  jshshir: string;
  login: string;
  phone: string;
  roles: string;

  sub_roles: string[];
  updatedAt: string;
  username: string;
  mtu_ids: string[];
  line_ids: string[];
  station_ids: string[];
  company_ids: string[];
}

export type TUserSignIn = {
  login: string;
  password: string;
};

export type TLoginHistory = {
  id: number;
  ip_address: string;
  browser: string;
  device: string;
  login_time: string;
};

export type TRoleOption = {
  value: string;
  label: string;
};

export type TCreated_Author = {
  avatar: null;
  createdAt: string;
  domain: null;
  fullname: string;
  id: number;
  is_active: boolean;
  jshshir: string;
  login: string;
  phone: string;
  positions: string[];
  roles: string;
  sub_roles: null;
  updatedAt: string;
  username: string;
};
