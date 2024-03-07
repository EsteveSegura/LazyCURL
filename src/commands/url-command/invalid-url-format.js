class InvalidUrlFormat extends Error {
    constructor({message}) {
        super(message);
    }
}

module.exports = InvalidUrlFormat;