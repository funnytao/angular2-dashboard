import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './page/page.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket/ticket-form/ticket-form.component';
import { UploadComponent } from './upload/upload.component';
import { ChatComponent } from './chat/chat.component';
import { KeyMetricComponent } from './key-metric/key-metric.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/login', terminal: true },
  {
    path: 'page', component: PageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'keymetric',
        component: KeyMetricComponent
      },
      {
        path: 'ticket',
        component: TicketComponent,
        children: [
          {
            path: '',
            component: TicketListComponent
          },
          {
            path: 'new',
            component: TicketFormComponent
          }
        ]
      },
      {
        path: 'chat',
        component: ChatComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
