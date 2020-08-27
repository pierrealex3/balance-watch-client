export interface TransactionTemplateResWrapper {
    id: number,
    data: TransactionTemplateRes;
}

export interface TransactionTemplateRes {    
    date: Date;
    type: string;
    amount: number;
    way: string;
    note1: string;
    account: string;
    accountConnection: string;
    spans: Span[];
    reminderTemplate: ReminderTemplate;
}

export interface Span {
    startDate: Date;
    endDate: Date;
}

export interface ReminderTemplate {
    timeBefore: number;
    email: string;
}