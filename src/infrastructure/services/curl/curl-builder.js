class CurlBuilder {
    constructor({url = "", method = "GET", headers = "", includeHeaders = false,  data = null, askContentType = null}) {
        this.url = url;
        this.method = method;
        this.headers = headers.trim();
        this.includeHeaders = includeHeaders;
        this.data = data;
        this.askContentType = askContentType;
    }

    build() {
        const components = [
            "curl -X",
            this.method,
            this._includeHeadersTranslate(this.includeHeaders),
            this.url,
            this.headers,
            this._askContentTypeTranslate(this.askContentType),
            this._dataTranslate(this.data)
        ];

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
}

export default CurlBuilder;
