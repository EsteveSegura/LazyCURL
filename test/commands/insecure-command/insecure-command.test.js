const Insecure = require('../../../src/commands/insecure-command/index.js');

describe('Insecure', () => {
    it('should have name and message properties', () => {
        const insecureCommand = new Insecure();
        
        expect(insecureCommand.name).toBe("insecure");
        expect(insecureCommand.message).toBe("Quieres permitir peticiones inseguras (No verificar HTTPS) ?:");
    });
});