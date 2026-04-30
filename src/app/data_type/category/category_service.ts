export interface Category {
  _id: string;
  service_category_name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryResponse {
  message: string;
  statuscode: number;
  data: Category[];
  success: boolean;
}



 
export interface create_Category {
  service_category_name: string;
  description: string;
}



