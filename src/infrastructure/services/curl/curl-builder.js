class CurlBuilder {
    constructor({url = "", method = "GET"}) {
        this.url = url;
        this.method = method;
    }

    build() {
        return `curl -X ${this.method} ${this.url}`;
    }
}

export default CurlBuilder;

/*    
let curlCommand = `curl -X ${method} ${headers} ${url}`;
    if (data) {
        curlCommand += ` --data '${data}'`;
    }
*/

