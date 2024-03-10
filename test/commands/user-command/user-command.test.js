const AuthBasic = require('../../../src/commands/user-command/index.js');
const InvalidUserFormat = require('../../../src/commands/user-command/invalid-user-format.js');

describe('AuthBasicCommand', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should have name and message properties', () => {
        const authBasicCommand = new AuthBasic();
        
        expect(authBasicCommand.name).toBe("user");
        expect(authBasicCommand.message).toBe("Enter the username and password for basic authentication (format: 'username:password'):");
    });

    it('should throw error when running "validate" without authString', () => {
        const authBasicCommand = new AuthBasic();
        
        expect(() => authBasicCommand.validate({})).toThrow(InvalidUserFormat);
    });

    it('should throw error when running "validate" with incorrect format', () => {
        const authBasicCommand = new AuthBasic();
        const authString = "username";
        
        expect(() => authBasicCommand.validate({ authString })).toThrow(InvalidUserFormat);
    });

    it('should run "validate" without any errors if the authString is ok', () => {
        const authBasicCommand = new AuthBasic();
        const authString = "username:password";
        
        const result = authBasicCommand.validate({ authString });
        
        expect(result).toBe(true);
    });

    it('should throw error when running "validate" with empty username or password', () => {
        const authBasicCommand = new AuthBasic();
        let authString = ":password";
        
        expect(() => authBasicCommand.validate({ authString })).toThrow(InvalidUserFormat);

        authString = "username:";
        expect(() => authBasicCommand.validate({ authString })).toThrow(InvalidUserFormat);
    });
});