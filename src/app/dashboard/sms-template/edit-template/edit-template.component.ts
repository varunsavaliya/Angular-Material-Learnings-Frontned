import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmsTemplateService } from 'src/app/core/apiservices/sms-template.service';
import { SMSTemplate } from 'src/app/core/Models/SMSTemplate.model';
import { GlobalToastrService } from 'src/app/core/Services/global-toastr.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {
  loggedUser: any = null;
  smsTemplateDetail: SMSTemplate = {
    smsTemplateId: 0,
    name: '',
    template: '',
    createdOn: new Date(0),
    createdBy: 0,
    updatedBy: 0,
    updatedOn: new Date(),
  }
  constructor(private activatedRoute: ActivatedRoute, private smsTemplateServices: SmsTemplateService, private router: Router, private globalToastr: GlobalToastrService) {
    const loggedUserString = localStorage.getItem('user');

    if (loggedUserString) {
      this.loggedUser = JSON.parse(loggedUserString);
    }
   }

  editSMSTemplateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    template: new FormControl('', [Validators.required]),
    smsTemplateId: new FormControl(),
  })
  get name() {
    return this.editSMSTemplateForm.get('name');
  }
  get template() {
    return this.editSMSTemplateForm.get('template');
  }
  get smsTemplateId() {
    return this.editSMSTemplateForm.get('smsTemplateId');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.smsTemplateServices.getSMSTemplateById(id).subscribe({
            next: (responseData) => {
              this.editSMSTemplateForm.patchValue({
                name: responseData.data.name,
                template: responseData.data.template,
                smsTemplateId: responseData.data.smsTemplateId,
              })
            }
          })
        }
      }
    })
  }

  editSMSTemplate() {
    if (this.editSMSTemplateForm.valid) {
      this.smsTemplateDetail.name = this.editSMSTemplateForm.controls.name.value;
      this.smsTemplateDetail.template = this.editSMSTemplateForm.controls.template.value;
      this.smsTemplateDetail.smsTemplateId = this.editSMSTemplateForm.controls.smsTemplateId.value;
      this.smsTemplateDetail.updatedBy = this.loggedUser.userId;
      this.smsTemplateDetail.updatedOn = new Date();

      this.smsTemplateServices.updateSMSTemplate(this.smsTemplateDetail.smsTemplateId.toString(), this.smsTemplateDetail).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['dashboard', 'sms-template']);
            this.globalToastr.showToastr('success', response.message);
          } else {
            this.globalToastr.showToastr('error', response.message);
          }
        },
        error: (error) => {
          this.globalToastr.showToastr('error', error);
        }
      });
    }
  }
}
