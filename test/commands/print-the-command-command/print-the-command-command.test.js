const PrintTheCommandCommand = require("../../../src/commands/print-the-command-command/index.js");

describe('PrintTheCommandCommand', () => {
    it('should have name and message properties', () => {
        const printTheCommandCommand = new PrintTheCommandCommand();
        
        expect(printTheCommandCommand.name).toBe("printTheCommand");
        expect(printTheCommandCommand.message).toBe("Do you want to launch the command or print it on screen?");
        expect(printTheCommandCommand.choices).toEqual(["Launch command", "Print command on screen"]);
    });
});