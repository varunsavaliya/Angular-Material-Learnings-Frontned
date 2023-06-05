import { Component, OnInit } from '@angular/core';
import { SmsTemplateService } from 'src/app/core/apiservices/sms-template.service';
import { SMSTemplate } from 'src/app/core/Models/SMSTemplate.model';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.css']
})
export class SmsTemplateComponent implements OnInit {

  constructor(private smsTemplateServices: SmsTemplateService, private globalToastr: GlobalToastrService) { }

  displayedColumns: string[] = ['smsTemplateId', 'name', 'template', 'createdOn', 'createdBy', 'updatedOn', 'updatedBy', 'options'];
  dataSource: SMSTemplate[] = [];
  ngOnInit(): void {
    this.smsTemplateServices.getAllSMSTemplates().subscribe({
      next: (data) => {
        this.dataSource = data.items;
      },
    });
  }

  deleteSMSTemplate(smsTemplateId: number) {
    this.smsTemplateServices.deleteSMSTemplateById(smsTemplateId.toString()).subscribe({
      next: (response) => {
        if (response.success)
          this.globalToastr.showToastr("success", response.message);
        else
          this.globalToastr.showToastr("error", response.message);

        this.smsTemplateServices.getAllSMSTemplates().subscribe({
          next: (data) => {
            this.dataSource = data.items;
          },
        });
      }
    })
  }

}
