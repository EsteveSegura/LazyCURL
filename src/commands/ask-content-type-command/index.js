class AskContentType {
    constructor() {
        this.name = "askContentType";
        this.message = "What format does the payload have? :";
        this.choices =  ["application/json", "application/xml", "application/x-www-form-urlencoded", "multipart/form-data"];
    }
}

module.exports = AskContentType;
