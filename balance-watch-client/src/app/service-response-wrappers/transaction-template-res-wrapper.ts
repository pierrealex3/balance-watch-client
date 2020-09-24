export interface TransactionTemplateResWrapper {
    id: number,
    data: TransactionTemplateRes;
}

export interface TransactionTemplateRes {    
    date: Date;
    type: string;
    amount: number;
    way: string;
    note: string;
    account: number;
    accountConnection: number;
    spans: Span[];
    reminderTemplate: ReminderTemplate;
    frequency: string;
}

export interface Span {
    startDate: Date;
    endDate: Date;
}

export interface ReminderTemplate {
    timeBefore: number;
    email: string;
}