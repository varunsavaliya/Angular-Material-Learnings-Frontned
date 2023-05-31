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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
