const Verbose = require('../../../src/commands/verbose-command/index.js');

describe('Verbose', () => {
    it('should have name and message properties', () => {
        const verboseCommand = new Verbose();
        
        expect(verboseCommand.name).toBe("verbose");
        expect(verboseCommand.message).toBe("Quieres obtener información detallada de la petición (debug) ?:");
    });
});