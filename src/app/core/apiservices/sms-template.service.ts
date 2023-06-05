import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SMSTemplate } from '../Models/SMSTemplate.model';

@Injectable({
  providedIn: 'root'
})
export class SmsTemplateService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllSMSTemplates():Observable<any>{
    return this.http.get<any>(this.baseApiUrl + 'api/SMSTemplate');
  }

  getSMSTemplateById(smsTemplateId: string): Observable<any>{
    return this.http.get<any>(this.baseApiUrl + 'api/SMSTemplate/' + smsTemplateId)
  }

  updateSMSTemplate(smsTemplateId: string, smsTemplateDetail: SMSTemplate):Observable<any>{
    return this.http.patch<any>(this.baseApiUrl + 'api/SMSTemplate/' + smsTemplateId, smsTemplateDetail);
  }

  addSMSTemplate(smsTemplateDetail: SMSTemplate): Observable<any>{
    return this.http.post<any>(this.baseApiUrl + 'api/SMSTemplate', smsTemplateDetail)
  }

  deleteSMSTemplateById(smsTemplateId: string): Observable<any>{
    return this.http.delete<any>(this.baseApiUrl + 'api/SMSTemplate/' + smsTemplateId)
  }
}
