import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SmsTemplateService } from 'src/app/core/apiservices/sms-template.service';
import { SMSTemplate } from 'src/app/core/Models/SMSTemplate.model';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  loggedUser: any = null;
  smsTemplateDetail: SMSTemplate = {
    smsTemplateId: 0,
    name: '',
    template: '',
    createdOn: new Date(),
    createdBy: 0,
    updatedBy: 0,
    updatedOn: null,
  }
  constructor(private smsTemplateService: SmsTemplateService, private router: Router, private globalToastr: GlobalToastrService) {
    const loggedUserString = localStorage.getItem('user');

    if (loggedUserString) {
      this.loggedUser = JSON.parse(loggedUserString);
    }
  }
  addSMSTemplateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    template: new FormControl('', [Validators.required]),
  })
  get name() {
    return this.addSMSTemplateForm.get('name');
  }
  get template() {
    return this.addSMSTemplateForm.get('template');
  }

  ngOnInit(): void {
  }

  addSMSTemplate() {
    if (this.addSMSTemplateForm.valid) {
      this.smsTemplateDetail.name = this.addSMSTemplateForm.controls.name.value;
      this.smsTemplateDetail.template = this.addSMSTemplateForm.controls.template.value;
      this.smsTemplateDetail.createdBy = this.loggedUser.userId;
      this.smsTemplateDetail.createdOn = new Date();

      this.smsTemplateService.addSMSTemplate(this.smsTemplateDetail).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['dashboard', 'sms-template']);
            this.globalToastr.showToastr('success', response.message);
          }
          else {
            this.globalToastr.showToastr('error', response.message);
          }
        },
        error: (error) => {
          this.globalToastr.showToastr('error', error);
        }
      })
    }
  }

}
