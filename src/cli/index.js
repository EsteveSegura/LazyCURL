import inquirer from "inquirer";

import UrlCommand from "../commands/url-command/index.js";
const urlCommand = new UrlCommand();

import MethodCommand from "../commands/method-command/index.js";
const methodCommand = new MethodCommand();

import HeadersCommand from "../commands/headers-command/index.js";
const headersCommand = new HeadersCommand();

import CurlBuilder from "../infrastructure/services/curl/curl-builder.js";
import CurlLauncher from "../infrastructure/services/curl/curl-launcher.js";


import confirmation from "./confirmation.js";
const confirmationHeaders = confirmation({name: headersCommand.name, message: "¿Desea ejecutar el comando curl?", valueDefault: false});

async function menuBuild() {
    const { url, method, headers } = await inquirer.prompt([
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
        },
        confirmationHeaders,
        {
            type: "input",
            name: headersCommand.name,
            message: headersCommand.message,
            validate: (value) => {return headersCommand.validate({headerString: value}); },
            filter: (value) => {return headersCommand.filter({headerString: value}); },
            when: answers => answers[`${confirmationHeaders.prefix}${headersCommand.name}`]
        }
    ]);
    const curlBuilder = new CurlBuilder({url, method, headers});
    const curlCommand = curlBuilder.build();

    const curlLauncher = new CurlLauncher({curlCommand});
    curlLauncher.launch();
}


export default menuBuild;