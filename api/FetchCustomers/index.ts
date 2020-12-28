import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('FetchCustomer - called.');

    try {
        let res = await axios.get("https://api.fortnox.se/3/customers", {
            headers: {
                "Content-Type": "application/json",
                "Client-Secret": process.env.FNX_CLIENT_SECRET,
                "Accept": "application/json",
                "Access-Token": process.env.FNX_ACCESS_TOKEN
            }
        });
        context.log(res.data.Customers);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: res.data.Customers
        };

    } catch (err) {
        context.log(`FetchCustomer - Error: {err.message}`);
        context.res = {
            status: 500, // Server error
            body: {
                error_message: err.message
            }
        };
    }

};

export default httpTrigger;