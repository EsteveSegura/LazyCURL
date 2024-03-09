const UserAnget = require('../../../src/commands/user-agent-command/index.js');

describe('UserAgentCommand', () => {
    it('should have name and message properties', () => {
        const userAgentCommand = new UserAnget();
        
        expect(userAgentCommand.name).toBe("userAgent");
        expect(userAgentCommand.message).toBe("Introduce el User-Agent:");
    });
});