class InvalidUrlFormat extends Error {
    constructor({message}) {
        super(message);
    }
}

export default InvalidUrlFormat;