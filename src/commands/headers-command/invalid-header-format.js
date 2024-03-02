class InvalidHeaderFormat extends Error {
    constructor({message}) {
        super(message);
    }
}

export default InvalidHeaderFormat;