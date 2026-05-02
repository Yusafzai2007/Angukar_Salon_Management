// ===== CATEGORY =====
export interface ServiceCategory {
  _id: string;
  service_category_name: string;
  description: string;
}

// ===== GET SERVICE (API DATA) =====
export interface ServiceData {
  _id: string;
  Service_Name: string;
  price: string;
  discount: string;
  final_price: string;
  duration: string;
  description: string;
  service_Image: string[];
  category: ServiceCategory; // 🔥 populated object
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ===== API RESPONSE =====
export interface ServiceResponse {
  message: string;
  statuscode: number;
  data: ServiceData[];
  success: boolean;
}

// ===== ADD SERVICE (POST) =====
export interface AddService {
  Service_Name: string;
  price: string;
  discount: string;
  final_price: string;
  duration: string;
  description: string;
  service_category_name: string; // 🔥 ye bhejna hai
  service_Image?: File[]; // 🔥 for upload
}