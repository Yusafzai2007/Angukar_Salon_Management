import { Routes } from '@angular/router';
import { Sidebar } from './admin_panel/sidebar/sidebar';
import { User } from './admin_panel/user/user';
import { AddUser } from './admin_panel/add-user/add-user';
import { EditUser } from './admin_panel/edit-user/edit-user';
import { ServiceAdd } from './admin_panel/service/service-add/service-add';
import { EditService } from './admin_panel/service/edit-service/edit-service';
import { ServicesFetch } from './admin_panel/service/services-fetch/services-fetch';
import { CreateCategory } from './service_category/create-category/create-category';
import { FetchCategory } from './service_category/fetch-category/fetch-category';
import { FetchAppointment } from './appointment/fetch-appointment/fetch-appointment';
import { AddStaff } from './staff/add-staff/add-staff';
import { FetchStaff } from './staff/fetch-staff/fetch-staff';

export const routes: Routes = [
  {
    path: '',
    component: Sidebar,
    children: [
      {
        path: 'user',
        component: User,
      },
      {
        path: 'add_user',
        component: AddUser,
      },
      {
        path: 'edit_user/:id',
        component: EditUser,
      },
      {
        path: 'service',
        component: ServicesFetch,
      },
      {
        path: 'add_service',
        component: ServiceAdd,
      },
      {
        path: 'edit_service/:id',
        component: EditService,
      },
      {
        path: 'service_category',
        component: CreateCategory,
      },
      {
        path: 'get_service_category',
        component: FetchCategory,
      },
      {
        path: 'get_appointment',
        component: FetchAppointment,
      },
      {
        path: 'add_staff',
        component: AddStaff,
      },
      {
        path: 'get_staff',
        component: FetchStaff,
      },
    ],
  },
];
