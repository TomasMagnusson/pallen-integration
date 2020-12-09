import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import df = require("durable-functions");

import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // const client = df.getClient(context);
    // const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

    try {
        let res = await axios.get("https://api.fortnox.se/3/customers", {
            headers: {
                "Content-Type": "application/json",
                "Client-Secret": "QofOPmWKmY",
                "Accept": "application/json",
                "Access-Token": "baebed23-76b4-40f2-9aa7-208cad0c157c"
            }
        });
        context.log(res.data.Customers);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                text: JSON.stringify(res.data.Customers[0],null,"<br/>")
            }
        };
    } catch (err) {
        context.log(err.message);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                text: err.message
            }
        };
    }

};

export default httpTrigger;