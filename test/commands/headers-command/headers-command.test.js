const Headers = require("../../../src/commands/headers-command");
const InvalidHeaderFormat = require("../../../src/commands/headers-command/invalid-header-format");

describe("HeadersCommand", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should have name and message properties", () => {
        const headersCommand = new Headers();

        expect(headersCommand.name).toBe("headers");
        expect(headersCommand.message).toBe("Introduce los encabezados (separados por coma: 'header1: value1, header2: value2'):");
    });

    it("should throw error when running 'validate' without headers", () => {
        const headersCommand = new Headers();

        expect(() => headersCommand.validate({})).toThrow(InvalidHeaderFormat);
    });

    it("should throw error when running 'validate' with '-H \"\"'", () => {
        const headersCommand = new Headers();

        expect(() => headersCommand.validate({ headerString: "-H ''" })).toThrow(InvalidHeaderFormat);
    });

    it("should throw error when running 'validate' with invalid headers", () => {
        const headersCommand = new Headers();

        expect(() => headersCommand.validate({ headerString: "-H header1 value1" })).toThrow(InvalidHeaderFormat);
    });

    it("should run 'validate' without any errors if the headers are ok", () => {
        const headersCommand = new Headers();

        const headerString = "header1: value1, header2: value2";
        const result = headersCommand.validate({ headerString });

        expect(result).toBe(true);
    });

    it("should run 'validate' without any errors if the multiple headers are ok", () => {
        const headersCommand = new Headers();

        const headerString = "header1: value1, header2: value2, header3: value3";
        const result = headersCommand.validate({ headerString });

        expect(result).toBe(true);
    });

    it("should run 'filter' without any errors if the headers are ok", () => {
        const headersCommand = new Headers();

        const headerString = "header1: value1, header2: value2";
        const result = headersCommand.filter({ headerString });

        expect(result).toBe("-H 'header1: value1' -H 'header2: value2'");
    });
});