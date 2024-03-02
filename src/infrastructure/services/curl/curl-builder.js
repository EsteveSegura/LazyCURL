class CurlBuilder {
    constructor({url = "", method = "GET", headers = ''}) {
        this.url = url;
        this.method = method;
        this.headers = headers.trim();
    }

    build() {
        const components = [
            'curl -X',
            this.method,
            this.url,
            this.headers
        ];

        return components.filter(component => component).join(' ');
    }
}

export default CurlBuilder;

/*    
let curlCommand = `curl -X ${method} ${headers} ${url}`;
    if (data) {
        curlCommand += ` --data '${data}'`;
    }
*/

