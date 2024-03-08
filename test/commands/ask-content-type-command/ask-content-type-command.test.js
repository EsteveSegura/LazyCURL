const AskContentType = require("../../../src/commands/ask-content-type-command");

describe('AskContentTypeCommand', () => {
    it('should have name and message properties', () => {
        const askContentTypeCommand = new AskContentType();
        
        expect(askContentTypeCommand.name).toBe("askContentType");
        expect(askContentTypeCommand.message).toBe("Que formato tiene el payload? :");
        expect(askContentTypeCommand.choices).toEqual(["application/json", "application/xml", "application/x-www-form-urlencoded", "multipart/form-data"]);
    });
});