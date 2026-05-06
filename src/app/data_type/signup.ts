export interface Userdata {
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

export interface UsersResponse {
  statuscode: number;
  data: Userdata[];
  message: string;
  success: boolean;
}



export interface AddUserdata {
  userName: string;
  email: string;
  password: string;
  role: string;
  status: string;
}


export interface UserDataResponse {
  message: string;
  statuscode: number;
  data: {
    _id: string;
    userName: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  success: boolean;
}




