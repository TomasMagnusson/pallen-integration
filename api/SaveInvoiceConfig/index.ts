import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {InvoiceConfig} from "./InvoiceModels";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let config:InvoiceConfig = req.body;

    context.bindings.invoiceConfigBlob = config;
    context.done();
};

export default httpTrigger;