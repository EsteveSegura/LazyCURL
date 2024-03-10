const Cookie = require("../../../src/commands/cookie-command/index.js");
const InvalidCookieFormat = require("../../../src/commands/cookie-command/invalid-cookie-format.js");

describe("CookieCommand", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should have name and message properties", () => {
        const cookieCommand = new Cookie();

        expect(cookieCommand.name).toBe("cookie");
        expect(cookieCommand.message).toBe("Enter the cookies\n(separated by commas: 'cookieName=cookieValue, cookieName2=cookieValue2'):");
    });

    it("should throw error when running 'validate' without cookies", () => {
        const cookieCommand = new Cookie();

        expect(() => cookieCommand.validate({})).toThrow(InvalidCookieFormat);
    });

    it("should throw error when running 'validate' with '-b \"\"'", () => {
        const cookieCommand = new Cookie();

        expect(() => cookieCommand.validate({ cookieString: "-b ''" })).toThrow(InvalidCookieFormat);
    });

    it("should throw error when running 'validate' with invalid cookies", () => {
        const cookieCommand = new Cookie();

        expect(() => cookieCommand.validate({ cookieString: "-b cookie1 value1" })).toThrow(InvalidCookieFormat);
    });

    it("should run 'validate' without any errors if the cookies are ok", () => {
        const cookieCommand = new Cookie();

        const cookieString = "cookie1=value1, cookie2=value2";
        const result = cookieCommand.validate({ cookieString });

        expect(result).toBe(true);
    });

    it("should run 'validate' without any errors if the multiple cookies are ok", () => {
        const cookieCommand = new Cookie();

        const cookieString = "cookie1=value1, cookie2=value2, cookie3=value3";
        const result = cookieCommand.validate({ cookieString });

        expect(result).toBe(true);
    });
});