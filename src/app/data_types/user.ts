// user.ts - Update your interface
export interface userdata {
  _id: string;
  userName: string;
  email: string;
  role: 'customer' | 'admin'; // Only these roles exist in your API
  status?: string; // Make status optional if it doesn't exist in API
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AllUsersResponse {
  message: number;      // ✅ Correct (200)
  statuscode: userdata[]; // ✅ Correct (users array)
  data: string;         // ✅ Correct (message text)
  success: boolean;     // ✅ Correct
}