// Service Interface
export interface ServiceItem {
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

// User Interface
export interface StaffUser {
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

// Staff Interface
export interface Staff {
  _id: string;
  user_id: StaffUser;
  phone_number: string;
  experience: string;
  address: string;
  description: string;
  service_id: ServiceItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response Interface
export interface StaffResponse {
  message: Staff;
  statuscode: number;
  data: string;
  success: boolean;
}