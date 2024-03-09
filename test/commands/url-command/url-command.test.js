const Url = require('../../../src/commands/url-command/index.js');
const InvalidUrlFormat = require('../../../src/commands/url-command/invalid-url-format.js');

describe('UrlCommand', () => { 
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should have name and message properties', () => {
        const urlCommand = new Url();
        
        expect(urlCommand.name).toBe("url");
        expect(urlCommand.message).toBe("Enter the URL:");
    });

    it('should throw error when running "validate" without url', () => {
        const urlCommand = new Url();
        
        expect(() => urlCommand.validate({})).toThrow(InvalidUrlFormat);
    });

    describe('should run "validate" without any errors if the url is ok', () => {
        test('url: https://www.google.com', () => {
            const urlCommand = new Url();
            const url = "https://www.google.com";
            
            const result = urlCommand.validate({ url });
            
            expect(result).toBe(true);
        });
    
        test('url: https://www.google', () => {
            const urlCommand = new Url();
            const url = "https://www.google";
            
            const result = urlCommand.validate({ url });
            
            expect(result).toBe(true);
        });

        test('url: https://google', () => {
            const urlCommand = new Url();
            const url = "https://google";
            
            const result = urlCommand.validate({ url });
            
            expect(result).toBe(true);
        });

        test('url: http://google', () => {
            const urlCommand = new Url();
            const url = "http://google";
            
            const result = urlCommand.validate({ url });
            
            expect(result).toBe(true);
        });
    });

    
    describe('should throw error when running "validate" with incorrect urls', () => {
        it('url: www.google.com', () => {
            const urlCommand = new Url();
            const url = "www.google.com";
            
            expect(() => urlCommand.validate({ url })).toThrow(InvalidUrlFormat);
        });

        it('url: anytext', () => {
            const urlCommand = new Url();
            const url = "anytext";
            
            expect(() => urlCommand.validate({ url })).toThrow(InvalidUrlFormat);
        });
    })
});