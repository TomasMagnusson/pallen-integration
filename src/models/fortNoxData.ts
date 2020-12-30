// Data defs for FortNox integration


export interface Customer {
    CustomerNumber: number,
    Name: string,
    Address1: string,
    Email: string,
    Invoiced: boolean
}

export interface Article {
    articleNumer: string
}

export interface Invoice {
    invliceNumber: string
}

export interface FortNoxData {
    customersData: Customer[],
    articlesData: Article[],
    invoicesData: Invoice[]
}
