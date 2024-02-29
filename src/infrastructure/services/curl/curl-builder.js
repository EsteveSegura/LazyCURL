class CurlBuilder {
    constructor({url = ""}) {
        this.url = url;
    }

    build() {
        return `curl ${this.url}`;
    }
}

export default CurlBuilder;

/*    
let curlCommand = `curl -X ${method} ${headers} ${url}`;
    if (data) {
        curlCommand += ` --data '${data}'`;
    }
*/

