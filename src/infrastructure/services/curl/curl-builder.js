class CurlBuilder {
    constructor({url = "", method = "GET", headers = "", includeHeaders = false,  data = null, askContentType = null, output = null, userAgent = null, location = null, insecure = null, verbose = null, cookie = null}) {
        this.url = url;
        this.method = method;
        this.headers = headers.trim();
        this.includeHeaders = includeHeaders;
        this.data = data;
        this.askContentType = askContentType;
        this.output = output;
        this.userAgent = userAgent;
        this.location = location;
        this.insecure = insecure;
        this.verbose = verbose;
        this.cookie = cookie;
    }

    build() {
        const components = [
            "curl -X",
            this.method,
            this._includeHeadersTranslate(this.includeHeaders),
            this.headers,
            this._askContentTypeTranslate(this.askContentType),
            this._dataTranslate(this.data),
            this._outputTranslate(this.output),
            this._userAgentTranslate(this.userAgent),
            this._locationTranslate(this.location),
            this._insecureTranslate(this.insecure),
            this._verboseTranslate(this.verbose),
            this._cookieTranslate(this.cookie),
            this.url,
        ];

        // If the user wants to save the response in a file,
        // then the -i flag is going to created interferes 
        // with the output file, so it is removed.
        // Remove from componentes the flag -i 
        if(this.output) {
            components.splice(2, 1);
            // TODO: Add a warning message to the user, to let them know that the -i flag was removed
        }

        return components.filter(component => component).join(" ");
    }

    _includeHeadersTranslate(value) {
        return value ? "-i" : "";
    }

    _askContentTypeTranslate(value) {
        return value ? `-H "Content-Type: ${value}"` : "";
    }

    _dataTranslate(value) {
        return value ? `--data '${value}'` : "";
    }

    _outputTranslate(value) {
        return value ? `--output ${value}` : "";
    }

    _userAgentTranslate(value) {
        return value ? `--user-agent '${value}'` : "";
    }

    _locationTranslate(value) {
        return value ? "--location" : "";
    }

    _insecureTranslate(value) {
        return value ? "--insecure" : "";
    }

    _verboseTranslate(value) {
        return value ? "--verbose" : "";
    }
    
    _cookieTranslate(value) {
        if(!value) {
            return "";
        }
        
        const isCommaSeparated = value.includes(",");

        if(!isCommaSeparated) { 
            return value ? `--cookie '${value}'` : "";
        }

        return value.split(",").map(cookie => `--cookie '${cookie.trim()}'`).join(" ");
    }
}

module.exports = CurlBuilder;
