export class SMSTemplate {
    smsTemplateId: number;
    name: string | null;
    template: string | null;
    createdOn: Date | null;
    createdBy: number;
    updatedOn: Date | null;
    updatedBy: number;

    constructor(smsTemplateId: number, name: string, template: string, createdOn: Date, createdBy: number, updatedOn: Date, updatedBy: number) {
        this.smsTemplateId = smsTemplateId;
        this.name = name;
        this.template = template;
        this.createdOn = createdOn;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }
}