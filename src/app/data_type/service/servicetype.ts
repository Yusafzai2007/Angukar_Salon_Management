export interface Service_data {
  _id: string;
  Service_Name: string;
  price: string;
  discount: string;
  final_price: string;
  duration: string;
  description: string;
  service_Image?: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServiceResponse {
  message: string;
  statuscode: number;
  data: Service_data[];
  success: boolean;
}

export interface add_Service {
  Service_Name: string;
  price: string;
  discount: string;
  final_price: string;
  duration: string;
  description: string;
  service_Image?: string[];
  category: string;
}
