import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('FetchInvoiceConfig function processed a request.');
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: context.bindings.invoiceConfigBlob
    };

};

export default httpTrigger;