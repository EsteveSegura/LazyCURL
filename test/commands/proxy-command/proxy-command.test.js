const ProxyCommand = require('../../../src/commands/proxy-command');

describe('ProxyCommand', () => {
    let proxyCommand;

    beforeEach(() => {
        proxyCommand = new ProxyCommand();
    });

    it('should have name and message properties', () => {
        expect(proxyCommand.name).toBe("proxy");
        expect(proxyCommand.message).toBe("Enter the proxy details (format: 'protocol://user:password@ProxyHost:port'):");
    });

    it('should validate the proxy string format correctly', () => {
        const validProxyString = "http://user:password@ProxyHost:80";
        expect(() => proxyCommand.validate({ proxyString: validProxyString })).not.toThrow();
    });

    it('should throw an error when the proxy string format is invalid', () => {
        const invalidProxyString = "http://user:password@ProxyHost";
        expect(() => proxyCommand.validate({ proxyString: invalidProxyString })).toThrow();
    });
});
