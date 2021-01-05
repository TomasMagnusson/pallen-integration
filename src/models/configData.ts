// Data defs for program operational configurations

export interface CustomerTypeConfig {
    customerType: string,
    articleNumbers: string[]
}

export interface CustomerExtraConfig {
    description: string,
    price: number
}

export interface CustomerConfig {
    customerNumber: string,
    customerType: string,
    customerExtras: string[]
}

export interface InvoiceConfig {
    creationDate: Date,
    invoiceDate: Date,
    customerTypes: CustomerTypeConfig[],
    customerExtras: CustomerExtraConfig[],
    customers: CustomerConfig[]
}
