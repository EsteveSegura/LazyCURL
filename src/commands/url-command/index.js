const InvalidUrlFormat = require("./invalid-url-format.js");

class Url {
    constructor() {
        this.name = "url";
        this.message = "Enter the URL:";
    }

    validate({ url }) {
        const urlRegex = /^(http|https):\/\/[^ "]+$/;

        if (!urlRegex.test(url)) {
            throw new InvalidUrlFormat({ message: "Invalid URL format, please try again." });
        }

        return urlRegex.test(url);
    }
}

module.exports = Url;