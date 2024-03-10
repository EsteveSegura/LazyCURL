const UserAnget = require('../../../src/commands/user-agent-command/index.js');

describe('UserAgentCommand', () => {
    it('should have name and message properties', () => {
        const userAgentCommand = new UserAnget();
        
        expect(userAgentCommand.name).toBe("userAgent");
        expect(userAgentCommand.message).toBe("Enter the User-Agent (TAB to select):");
        expect(userAgentCommand.suggestions).toBeInstanceOf(Array);
        expect(userAgentCommand.suggestions.length).toBe(999);
        expect(userAgentCommand.suggestions[0]).toBe("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36");
        expect(userAgentCommand.suggestions[998]).toBe("Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) GSA/7.0.55539 Mobile/12H143 Safari/600.1.4");
    });
});