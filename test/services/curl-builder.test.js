import CurlBuilder from "../../src/infrastructure/services/curl-builder";

describe('CurlBuilder', () => { 
    it('should build a curl command with the given url', () => {
        const url = "https://www.google.com";
        const curlBuilder = new CurlBuilder({ url });

        const result = curlBuilder.build();

        expect(result).toBe(`curl ${url}`);
    });

    it('should build a curl command without url', () => {
        const url = "";
        const curlBuilder = new CurlBuilder({ url });

        const result = curlBuilder.build();

        expect(result).toBe(`curl `);
    });
    
    it('should build a curl command when url is not provided', () => {
        const curlBuilder = new CurlBuilder({  });

        const result = curlBuilder.build();

        expect(result).toBe(`curl `);
    });
});