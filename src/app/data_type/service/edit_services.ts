// Category Interface
export interface ServiceCategory {
  _id: string;
  service_category_name: string;
  description: string;
}

// Service Interface
export interface SingleService {
  _id: string;
  Service_Name: string;
  price: string;
  discount: string;
  final_price: string;
  duration: string;
  description: string;
  service_Image: string[];
  category: ServiceCategory; // 👈 populated object
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response Interface
export interface SingleServiceResponse {
  message: string;
  statuscode: number;
  data: SingleService;
  success: boolean;
}