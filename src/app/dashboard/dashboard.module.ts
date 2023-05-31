import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MembersComponent } from './members/members.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { SettingsComponent } from './settings/settings.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from '../core/core.module';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../core/Services/auth-interceptor.service';
@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    MembersComponent,
    EmailTemplateComponent,
    SmsTemplateComponent,
    SettingsComponent,
    AddMemberComponent,
    EditMemberComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 1500, // 15 seconds
      progressBar: true,
    }),
    
  ],
  exports:[  ],
  providers:[
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }]
})
export class DashboardModule { }
