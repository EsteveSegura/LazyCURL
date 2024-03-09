const AskContentType = require("../../../src/commands/ask-content-type-command");

describe('AskContentTypeCommand', () => {
    it('should have name and message properties', () => {
        const askContentTypeCommand = new AskContentType();
        
        expect(askContentTypeCommand.name).toBe("askContentType");
        expect(askContentTypeCommand.message).toBe("What format does the payload have? :");
        expect(askContentTypeCommand.choices).toEqual(["application/json", "application/xml", "application/x-www-form-urlencoded", "multipart/form-data"]);
    });
});