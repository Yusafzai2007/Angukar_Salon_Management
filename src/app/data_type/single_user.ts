export interface single_Userdata {
  _id: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface single_UsersResponse {
  statuscode: number;
  data: single_Userdata;
  message: string;
  success: boolean;
}