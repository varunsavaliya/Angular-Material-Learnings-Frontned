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





// import { Injectable } from '@angular/core';
// import { Category } from './category.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {

//   constructor() {}

//   list(): Category[] {
//     return this.categoryDetails;
//   }

//  categoryDetails: any[] = [
//     {
//       id: 1, code: 11, name: 'Furniture', isActive: true  
//     },
//     {
//       id: 2, code: 12, name: 'Food', isActive: false  
//     },
//     {
//       id: 3, code: 13, name: 'Auto Mobile', isActive: true  
//     },
//     {
//       id: 4, code: 14, name: 'Entertainment', isActive: false  
//     },
//     {
//       id: 5, code: 15, name: 'Sports', isActive: false  
//     },    
//     {
//       id: 6, code: 16, name: 'Books', isActive: true  
//     },
//     {
//       id: 7, code: 17, name: 'Education', isActive: false  
//     },
//     {
//       id: 8, code: 18, name: 'Shoes', isActive: true  
//     },
//     {
//       id: 9, code: 19, name: 'Clothes', isActive: false  
//     }
//   ]

//   public getCategoriesName():  string[]{
//     const categoryNames: string[] = [];
//      for (let index = 0; index < this.categoryDetails.length; index++) {
//       const name = this.categoryDetails[index].name;
//       categoryNames.push(name);
//      }

//      return categoryNames;
//   }
    
  
// }