import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from "axios";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('FetchArticles - called.');

    try {
        let res = await axios.get("https://api.fortnox.se/3/articles", {
            headers: {
                "Content-Type": "application/json",
                "Client-Secret": process.env.FNX_CLIENT_SECRET,
                "Accept": "application/json",
                "Access-Token": process.env.FNX_ACCESS_TOKEN
            }
        });
        context.log(res.data.Articles);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: res.data.Articles
        };

    } catch (err) {
        context.log(`FetchArticles - Error: ${err.message}`);
        context.res = {
            status: 500, // Server error
            body: {
                error_message: err.message
            }
        };
    }
};

export default httpTrigger;