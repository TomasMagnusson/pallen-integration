// Services related to the FortNox api

import store from '@/store/store'
import { Customer, Article, Invoice, FortNoxData } from '@/models/fortNoxData';
import { InvoiceConfig } from '@/models/configData'

export async function createInvoices() {
    const custs: Customer[] = store.getters['fortNoxModule/fetchCustomers']
    const invoiceConfig: InvoiceConfig = store.getters['invoiceConfigModule/invoiceConfig']

    for (const cust of custs) {
        if (!cust.Invoiced) {
            const res = await fetch('api/createinvoice', {
                method: 'POST',
                cache: 'no-cache',
                body: JSON.stringify({
                    CustomerNumber: cust.CustomerNumber,
                    InvoiceDate: invoiceConfig.invoiceDate.toLocaleDateString()

                })
            })
            if (res.ok) {
                const inv = await res.json()
                store.commit('fortNoxModule/setInvoice', inv)
            }
        }
    }
}
