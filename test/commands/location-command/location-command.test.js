const Location = require('../../../src/commands/location-command/index.js');

describe('Location', () => {
    it('should have name and message properties', () => {
        const locationCommand = new Location();
        
        expect(locationCommand.name).toBe("location");
        expect(locationCommand.message).toBe("Do you want to follow redirects?:");
    });
});