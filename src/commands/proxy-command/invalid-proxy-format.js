class InvalidProxyFormat extends Error {
    constructor({message}) {
        super(message);
    }
}

module.exports = InvalidProxyFormat;