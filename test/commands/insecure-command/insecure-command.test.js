const Insecure = require('../../../src/commands/insecure-command/index.js');

describe('Insecure', () => {
    it('should have name and message properties', () => {
        const insecureCommand = new Insecure();
        
        expect(insecureCommand.name).toBe("insecure");
        expect(insecureCommand.message).toBe("Do you want to allow insecure requests (Do not verify HTTPS)?:");
    });
});