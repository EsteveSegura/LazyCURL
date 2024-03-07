class AskContentType {
    constructor() {
        this.name = "askContentType";
        this.message = "Que formato tiene el payload? :";
        this.choices =  ["application/json", "application/xml", "application/x-www-form-urlencoded", "multipart/form-data"];
    }
}

module.exports = AskContentType;
