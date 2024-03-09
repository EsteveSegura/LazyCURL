const Output = require('../../../src/commands/output-command/index.js');

describe('OutputCommand', () => {
    it('should have name and message properties', () => {
        const outputCommand = new Output();
        
        expect(outputCommand.name).toBe("output");
        expect(outputCommand.message).toBe("Enter the output file name:");
    });
});