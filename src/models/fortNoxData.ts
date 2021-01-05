// Data defs for FortNox integration


export interface Customer {
    CustomerNumber: string,
    Name: string,
    Address1: string,
    Email: string,
    Invoiced: boolean
}

export interface Article {
    ArticleNumer: string,
    Description: string,
    SalesPrice: number
}

export interface Invoice {
    InvoiceDate: string,
    CustomerNumber: string
}

export interface FortNoxData {
    customersData: Customer[],
    articlesData: Map<string, Article>,
    invoicesData: Invoice[]
}
