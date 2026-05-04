export interface ApiResponse {
  message: Staff[];
  statuscode: number;
  data: string;
  success: boolean;
}

export interface Staff {
  _id: string;
  user_id: User;
  phone_number: string;
  experience: string;
  address: string;
  service_id: Service[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
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

export interface Service {
  _id: string;
  Service_Name: string;
  price: string;
  discount: string;
  final_price: string;
  duration: string;
  description: string;
  service_Image: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}










export interface CreateStaffPayload {
  userName: string;
  phone_number: string;
  experience: string;
  address: string;
  description: string;
  Service_Name: string[];
}