import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/issues/list',
        pathMatch: 'full'
      },
      {
        path: 'issues',
        loadChildren: './issues/issues.module#IssuesModule'
      }
      
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];
