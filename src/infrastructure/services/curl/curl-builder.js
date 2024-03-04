class CurlBuilder {
    constructor({url = "", method = "GET", headers = "", includeHeaders = false}) {
        this.url = url;
        this.method = method;
        this.headers = headers.trim();
        this.includeHeaders = includeHeaders;
    }

    build() {
        const components = [
            "curl -X",
            this.method,
            this._includeHeadersTranslate(this.includeHeaders),
            this.url,
            this.headers
        ];

        return components.filter(component => component).join(" ");
    }

    _includeHeadersTranslate(value) {
        return value ? "-i" : "";
    }
}

export default CurlBuilder;

/*    
let curlCommand = `curl -X ${method} ${headers} ${url}`;
    if (data) {
        curlCommand += ` --data '${data}'`;
    }
*/
