const IncludeHeadersCommand = require('../../../src/commands/include-headers-command/index.js');

describe("IncludeHeadersCommand", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should have name and message properties", () => {
        const includeHeadersCommand = new IncludeHeadersCommand();

        expect(includeHeadersCommand.name).toBe("includeHeaders");
        expect(includeHeadersCommand.message).toBe("View the request headers:");
    });
});
