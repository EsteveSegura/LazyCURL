class Method {
    constructor() {
        this.name = "method";
        this.message = "Select the HTTP method:";
        this.choices =  ["GET", "POST", "PUT", "DELETE", "PATCH"];
    }
}

module.exports = Method;