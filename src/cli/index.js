const inquirer = require("inquirer");
inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));

const UrlCommand = require("../commands/url-command/index.js");
const urlCommand = new UrlCommand();

const MethodCommand = require("../commands/method-command/index.js");
const methodCommand = new MethodCommand();

const HeadersCommand = require("../commands/headers-command/index.js");
const headersCommand = new HeadersCommand();

const IncludeHeadersCommand = require("../commands/include-headers-command/index.js");
const includeHeadersCommand = new IncludeHeadersCommand();

const DataCommand = require("../commands/data-command/index.js");
const dataCommand = new DataCommand();

const AskContentTypeCommand = require("../commands/ask-content-type-command/index.js");
const askContentTypeCommand = new AskContentTypeCommand();

const OutputCommand = require("../commands/output-command/index.js");
const outputCommand = new OutputCommand();

const UserAgentCommand = require("../commands/user-agent-command/index.js");
const userAgentCommand = new UserAgentCommand();

const LocationCommand = require("../commands/location-command/index.js");
const locationCommand = new LocationCommand();

const InsecureCommand = require("../commands/insecure-command/index.js");
const insecureCommand = new InsecureCommand();

const VerboseCommand = require("../commands/verbose-command/index.js");
const verboseCommand = new VerboseCommand();

const CookieCommand = require("../commands/cookie-command/index.js");
const cookieCommand = new CookieCommand();

const UserCommand = require("../commands/user-command/index.js");
const userCommand = new UserCommand();

const ProxyCommand = require("../commands/proxy-command");
const proxyCommand = new ProxyCommand();

const PrintTheCommandCommand = require("../commands/print-the-command-command");
const printTheCommandCommand = new PrintTheCommandCommand();

const CurlBuilder = require("../infrastructure/services/curl/curl-builder.js");
const CurlLauncher = require("../infrastructure/services/curl/curl-launcher.js");

const confirmation = require("./confirmation.js");
const confirmationHeaders = confirmation({name: headersCommand.name, message: "Do you want to add headers?", valueDefault: false});
const confirmationData = confirmation({name: dataCommand.name, message: "Do you want to add curl payload?", valueDefault: false});
const confirmationOutput = confirmation({name: outputCommand.name, message: "Do you want to add an output file?", valueDefault: false});
const confirmationUserAgent = confirmation({name: userAgentCommand.name, message: "Do you want to customize the userAgent?", valueDefault: false});
const confirmationCookie = confirmation({name: cookieCommand.name, message: "Do you want to add cookies?", valueDefault: false});
const confirmationUser = confirmation({name: userCommand.name, message: "Do you want to add user and password (basic-auth) ?", valueDefault: false});
const confirmationProxy = confirmation({name: proxyCommand.name, message: "Do you want to add a proxy?", valueDefault: false});

async function menuBuild() {
    const { url, method, headers, includeHeaders, data, askContentType, output, userAgent, location, insecure, verbose, cookie, user, printTheCommand } = await inquirer.prompt([
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
            when: answers => answers[`${confirmationHeaders.prefixVal}${headersCommand.name}`]
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
            when: answers => answers[`${confirmationData.prefixVal}${dataCommand.name}`]
        },
        {
            type: "list",
            name: askContentTypeCommand.name,
            message: askContentTypeCommand.message,
            choices: askContentTypeCommand.choices,
            when: answers => answers[dataCommand.name]
        },
        confirmationOutput,
        {
            type: "input",
            name: outputCommand.name,
            message: outputCommand.message,
            when: answers => answers[`${confirmationOutput.prefixVal}${outputCommand.name}`]
        },
        confirmationUserAgent,
        {
            type: "autocomplete",
            suggestOnly: true,
            name: userAgentCommand.name,
            message: userAgentCommand.message,
            source: (_, input) => userAgentCommand.suggestions.filter((item) => item.toLowerCase().includes(input)),
            when: answers => answers[`${confirmationUserAgent.prefixVal}${userAgentCommand.name}`]
        },
        {
            type: "confirm",
            name: locationCommand.name,
            message: locationCommand.message,
            default: false,
        },
        {
            type: "confirm",
            name: insecureCommand.name,
            message: insecureCommand.message,
            default: false,
        },
        {
            type: "confirm",
            name: verboseCommand.name,
            message: verboseCommand.message,
            default: false,
        },
        confirmationCookie,
        {
            type: "input",
            name: cookieCommand.name,
            message: cookieCommand.message,
            validate: (value) => {return cookieCommand.validate({cookieString: value}); },
            when: answers => answers[`${confirmationCookie.prefixVal}${cookieCommand.name}`]
        },
        confirmationUser,
        {
            type: "input",
            name: userCommand.name,
            message: userCommand.message,
            validate: (value) => userCommand.validate({ authString: value }),
            when: answers => answers[`${confirmationUser.prefixVal}${userCommand.name}`]
        },
        confirmationProxy,
        {
            type: "input",
            name: proxyCommand.name,
            message: proxyCommand.message,
            validate: (value) => proxyCommand.validate({ proxyString: value }),
            when: answers => answers[`${confirmationProxy.prefixVal}${proxyCommand.name}`]
        },
        {
            type: "list",
            name: printTheCommandCommand.name,
            message: printTheCommandCommand.message,
            choices: printTheCommandCommand.choices
        }
    ]);
    const curlBuilder = new CurlBuilder({url, method, headers, includeHeaders, data, askContentType, output, userAgent, location, insecure, verbose, cookie, user});
    const curlCommand = curlBuilder.build();

    // If the user wants to print the command, then the command is printed and the program ends.
    // If the user wants to launch the command, then the command is launched.
    if (printTheCommand === printTheCommandCommand.choices[1]) {
        console.log(curlCommand);
        return;
    }

    const curlLauncher = new CurlLauncher({curlCommand, debug: verbose});
    curlLauncher.launch();
}

module.exports = menuBuild;