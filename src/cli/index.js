import inquirer from "inquirer";

import UrlCommand from "../commands/url-command/index.js";
const urlCommand = new UrlCommand();

import MethodCommand from "../commands/method-command/index.js";
const methodCommand = new MethodCommand();

import HeadersCommand from "../commands/headers-command/index.js";
const headersCommand = new HeadersCommand();

import IncludeHeadersCommand from "../commands/include-headers-command/index.js";
const includeHeadersCommand = new IncludeHeadersCommand();

import DataCommand from "../commands/data-command/index.js";
const dataCommand = new DataCommand();

import AskContentTypeCommand from "../commands/ask-content-type-command/index.js";
const askContentTypeCommand = new AskContentTypeCommand();

import CurlBuilder from "../infrastructure/services/curl/curl-builder.js";
import CurlLauncher from "../infrastructure/services/curl/curl-launcher.js";


import confirmation from "./confirmation.js";
const confirmationHeaders = confirmation({name: headersCommand.name, message: "¿Desea añadir headers?", valueDefault: false});
const confirmationData = confirmation({name: dataCommand.name, message: "¿Desea añadir payload curl?", valueDefault: false});

async function menuBuild() {
    const { url, method, headers, includeHeaders, data, askContentType } = await inquirer.prompt([
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
        },
        {
            type: "confirm",
            name: includeHeadersCommand.name,
            message: includeHeadersCommand.message,
            default: true,
        },
        confirmationData,
        {
            type: "input",
            name: dataCommand.name,
            message: dataCommand.message,
            when: answers => answers[`${confirmationData.prefix}${dataCommand.name}`]
        },
        {
            type: "list",
            name: askContentTypeCommand.name,
            message: askContentTypeCommand.message,
            choices: askContentTypeCommand.choices,
            when: answers => answers[dataCommand.name]
        }
    ]);
    const curlBuilder = new CurlBuilder({url, method, headers, includeHeaders, data, askContentType});
    const curlCommand = curlBuilder.build();

    const curlLauncher = new CurlLauncher({curlCommand});
    curlLauncher.launch();
}


export default menuBuild;