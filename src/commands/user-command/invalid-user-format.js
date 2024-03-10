class InvalidUserFormat extends Error {
    constructor({ message }) {
        super(message);
        this.name = "InvalidUserFormat";
    }
}

module.exports = InvalidUserFormat;