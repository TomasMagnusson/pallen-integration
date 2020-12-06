import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import df = require("durable-functions");

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // const client = df.getClient(context);
    // const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            text: "Hello from api"
        }
    };

};

export default httpTrigger;