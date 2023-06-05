import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MembersComponent } from './members/members.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { SettingsComponent } from './settings/settings.component';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { EditTemplateComponent } from './sms-template/edit-template/edit-template.component';
import { AddTemplateComponent } from './sms-template/add-template/add-template.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'email-template', component: EmailTemplateComponent },
      { path: 'sms-template', component: SmsTemplateComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'members/editmember/:id', component: EditMemberComponent },
      { path: 'members/addmember', component: AddMemberComponent },
      { path: 'sms-template/edit-sms-template/:id', component: EditTemplateComponent },
      { path: 'sms-template/add-sms-template', component: AddTemplateComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
