class InvalidCookieFormat extends Error {
    constructor({message}) {
        super(message);
    }
}

module.exports = InvalidCookieFormat;