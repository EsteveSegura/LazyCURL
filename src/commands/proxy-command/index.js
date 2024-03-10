const InvalidProxyFormat = require("./invalid-proxy-format");

class ProxyCommand {
    constructor() {
        this.name = "proxy";
        this.message = "Enter the proxy details (format: 'protocol://user:password@ProxyHost:port'):";
    }

    validate({ proxyString }) {
        // eslint-disable-next-line no-useless-escape
        const proxyRegex = /^(http|https|socks5):\/\/(\w+:\w+@)?[\w\.]+:\d+$/;
        if (!proxyString || !proxyRegex.test(proxyString)) {
            throw new InvalidProxyFormat({message: "Invalid proxy format, please use the format 'protocol://user:password@ProxyHost:port' and try again."});
        }

        return true;
    }
}

module.exports = ProxyCommand;