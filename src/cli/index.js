import inquirer from "inquirer";

import UrlCommand from "../commands/url-command/index.js";
const urlCommand = new UrlCommand();

import MethodCommand from "../commands/method-command/index.js";
const methodCommand = new MethodCommand();

import CurlBuilder from "../infrastructure/services/curl/curl-builder.js";
import CurlLauncher from "../infrastructure/services/curl/curl-launcher.js";

async function menuBuild() {
    const { url, method } = await inquirer.prompt([
        {
            type: "input",
            name: urlCommand.name,
            message: urlCommand.message,
            validate: (value)  => urlCommand.validate({url: value})
        }, 
        {
            type: "list",
            name: methodCommand.name,
            message: methodCommand.message,
            choices: methodCommand.choices
        }
    ]);
    const curlBuilder = new CurlBuilder({url ,method});
    const curlCommand = curlBuilder.build();

    const curlLauncher = new CurlLauncher({curlCommand});
    curlLauncher.launch();
}


export default menuBuild;