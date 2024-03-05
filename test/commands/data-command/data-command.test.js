import Data from "../../../src/commands/data-command";

describe('DataCommand', () => {
    it('should have name and message properties', () => {
        const dataCommand = new Data();
        
        expect(dataCommand.name).toBe("data");
        expect(dataCommand.message).toBe("Introduce el body:");
    });
});