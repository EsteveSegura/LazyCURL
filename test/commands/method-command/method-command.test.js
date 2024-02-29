import Method from '../../../src/commands/method-command/index.js';

describe('MethodCommand', () => {
    it('should have name and message properties', () => {
        const methodCommand = new Method();
        
        expect(methodCommand.name).toBe("method");
        expect(methodCommand.message).toBe("Selecciona el método HTTP:");
        expect(methodCommand.choices).toEqual(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
    });
});