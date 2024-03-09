const Data = require("../../../src/commands/data-command");

describe('DataCommand', () => {
    it('should have name and message properties', () => {
        const dataCommand = new Data();
        
        expect(dataCommand.name).toBe("data");
        expect(dataCommand.message).toBe("Enter the body:");
    });
});