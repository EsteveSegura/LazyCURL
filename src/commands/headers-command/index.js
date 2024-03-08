const InvalidHeaderFormat = require("./invalid-header-format.js");

class Headers {
    constructor() {
        this.name = "headers";
        this.message = "Introduce los encabezados (separados por coma: 'header1: value1, header2: value2'):";
    }

    validate({ headerString }) {
        if(!headerString) {
            throw new InvalidHeaderFormat({ message: "Headers are required" });
        }

        if(headerString === "-H ''") {
            throw new InvalidHeaderFormat({ message: "Headers are required" });
        }

        const headers = headerString.trim().split(" -H ").map(header => header.trim());
        const colons = headers.every(header => header.includes(":"));
        if(!colons) {
            throw new InvalidHeaderFormat({ message: "Invalid header format, please add a colon (:) between the header and the value, and try again" });
        }

        return true;
    }

    filter({ headerString }) {
        const headerStringFormated = headerString.trim().split(",").map(header => `-H '${header.trim()}'`).join(" ");

        const isValidated = this.validate({ headerString: headerStringFormated });
        if(!isValidated) {
            return "";
        }

        return headerStringFormated;
    }
}

module.exports = Headers;