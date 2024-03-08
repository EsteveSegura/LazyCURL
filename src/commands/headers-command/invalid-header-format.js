class InvalidHeaderFormat extends Error {
    constructor({message}) {
        super(message);
    }
}

module.exports = InvalidHeaderFormat;