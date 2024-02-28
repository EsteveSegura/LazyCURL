import inquirer from "inquirer";

import UrlCommand from "./commands/url-command/index.js";
const urlCommand = new UrlCommand();

import CurlBuilder from "./curl-builder.js";
import CurlLauncher from "./curl-launcher.js";

async function menuBuild() {
    const {url} = await inquirer.prompt([
        {
            type: "input",
            name: urlCommand.name,
            message: urlCommand.message,
            validate: (value)  => urlCommand.validate({url: value})
        }
    ]);
    const curlBuilder = new CurlBuilder({url});
    const curlCommand = curlBuilder.build();

    const curlLauncher = new CurlLauncher({curlCommand});
    curlLauncher.launch()
}


menuBuild();