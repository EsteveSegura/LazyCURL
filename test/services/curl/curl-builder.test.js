const CurlBuilder = require("../../../src/infrastructure/services/curl/curl-builder");

describe('CurlBuilder', () => {
    it('should build a curl command with the given url', () => {
        const url = "https://www.google.com";
        const curlBuilder = new CurlBuilder({ url });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET ${url}`);
    });

    it('should build a curl command without url', () => {
        const url = "";
        const curlBuilder = new CurlBuilder({ url });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET`);
    });

    it('should build a curl command when url is not provided', () => {
        const curlBuilder = new CurlBuilder({});

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET`);
    });

    it('should build a curl command with the given url and method (POST)', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const curlBuilder = new CurlBuilder({ url, method });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST ${url}`);
    });

    it('should build a curl command with the given url and method (PUT)', () => {
        const url = "https://www.google.com";
        const method = "PUT";
        const curlBuilder = new CurlBuilder({ url, method });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X PUT ${url}`);
    });

    it('should build a curl command with the given url and method (DELETE)', () => {
        const url = "https://www.google.com";
        const method = "DELETE";
        const curlBuilder = new CurlBuilder({ url, method });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X DELETE ${url}`);
    });

    it('should build a curl command with the given url and method (PATCH)', () => {
        const url = "https://www.google.com";
        const method = "PATCH";
        const curlBuilder = new CurlBuilder({ url, method });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X PATCH ${url}`);
    });

    it('should build a curl command with the given url and method (GET)', () => {
        const url = "https://www.google.com";
        const method = "GET";
        const curlBuilder = new CurlBuilder({ url, method });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET ${url}`);
    });

    it('should build a curl command with the given url and method by default if not specified (GET)', () => {
        const url = "https://www.google.com";
        const curlBuilder = new CurlBuilder({ url });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET ${url}`);
    });

    it('should build a curl command with the given url and headers', () => {
        const url = "https://www.google.com";
        const headers = "-H 'Content-Type: application/json'";
        const curlBuilder = new CurlBuilder({ url, headers });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET -H 'Content-Type: application/json' ${url}`);
    });

    it('should build a curl command with the given url, method and multiple headers', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const headers = "-H 'Content-Type: application/json' -H 'Authorization: Bearer 1234'";
        const curlBuilder = new CurlBuilder({ url, method, headers });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer 1234' ${url}`);
    });

    it('should build a curl command with the given url, method, headers and includeHeaders is true', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const headers = "-H 'Content-Type: application/json' -H ' Authorization: Bearer 1234'";
        const includeHeaders = true;
        const curlBuilder = new CurlBuilder({ url, method, headers, includeHeaders });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST -i -H 'Content-Type: application/json' -H ' Authorization: Bearer 1234' ${url}`);
    });

    it('should build a curl command with the given url, method, headers and includeHeaders is false', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const headers = "-H 'Content-Type: application/json' -H ' Authorization: Bearer 1234'";
        const includeHeaders = false;
        const curlBuilder = new CurlBuilder({ url, method, headers, includeHeaders });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST -H 'Content-Type: application/json' -H ' Authorization: Bearer 1234' ${url}`);
    });

    it('shourl build a curl command with the given url, method, headers and includeHeaders by default if not specified', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const headers = "-H 'Content-Type: application/json' -H ' Authorization: Bearer 1234'";
        const curlBuilder = new CurlBuilder({ url, method, headers });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST -H 'Content-Type: application/json' -H ' Authorization: Bearer 1234' ${url}`);
    });

    it('should build a curl command with the given url, method, headers and data', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const headers = "-H ' Authorization: Bearer 1234'";
        const data = '{"name": "John Doe"}';
        const curlBuilder = new CurlBuilder({ url, method, headers, data });

        const result = curlBuilder.build({ url, method, headers, data });

        expect(result).toBe(`curl -X POST -H ' Authorization: Bearer 1234' --data '{"name": "John Doe"}' ${url}`);
    });

    it('should build a curl command with the given url, method, headers, data and contentType (acording to data)', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const headers = "-H ' Authorization: Bearer 1234'";
        const data = '{"name": "John Doe"}';
        const askContentType = "application/json";
        const curlBuilder = new CurlBuilder({ url, method, headers, data, askContentType });

        const result = curlBuilder.build({ url, method, headers, data, askContentType});

        expect(result).toBe(`curl -X POST -H ' Authorization: Bearer 1234' -H "Content-Type: application/json" --data '{"name": "John Doe"}' ${url}`);
    });

    it('should build a curl command with the given url, method, and output', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const output = "response.json";
        const curlBuilder = new CurlBuilder({ url, method, output });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST --output response.json ${url}`);
    });

    it('should build a curl command with the given url, method, and output and remove the flag -i if was specified', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const output = "response.json";
        const includeHeaders = true;
        const curlBuilder = new CurlBuilder({ url, method, output, includeHeaders });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST --output response.json ${url}`);
    });

    it('should build a curl command with the given url, method and userAgent', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const userAgent = "Mozilla/5.0";
        const curlBuilder = new CurlBuilder({ url, method, userAgent });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST --user-agent 'Mozilla/5.0' ${url}`);
    });

    it('should build a curl command with the given url, method and following redirections with location', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const location = true;
        const curlBuilder = new CurlBuilder({ url, method, location });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST --location ${url}`);
    });

    it('should build a curl command with the given url, method and not following redirections with location', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const location = false;
        const curlBuilder = new CurlBuilder({ url, method, location });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST ${url}`);
    });

    it('should build a curl command with the given url, method and allowing insecure connections', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const insecure = true;
        const curlBuilder = new CurlBuilder({ url, method, insecure });
        
        const result = curlBuilder.build();
        
        expect(result).toBe(`curl -X POST --insecure ${url}`);
    });
    
    it('should build a curl command with the given url, method and not allowing insecure connections', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const insecure = false;
        const curlBuilder = new CurlBuilder({ url, method, insecure });
        
        const result = curlBuilder.build();
        
        expect(result).toBe(`curl -X POST ${url}`);
    });

    it('should build a curl command with the given url, method and verbose', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const verbose = true;
        const curlBuilder = new CurlBuilder({ url, method, verbose });
        
        const result = curlBuilder.build();
        
        expect(result).toBe(`curl -X POST --verbose ${url}`);
    });

    it('should build a curl command with the given url, method and not verbose', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const verbose = false;
        const curlBuilder = new CurlBuilder({ url, method, verbose });
        
        const result = curlBuilder.build();
        
        expect(result).toBe(`curl -X POST ${url}`);
    });

    it('should build a curl command with the given url, method and cookie', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const cookie = "session=1234";
        const curlBuilder = new CurlBuilder({ url, method, cookie });
        
        const result = curlBuilder.build();
        
        expect(result).toBe(`curl -X POST --cookie 'session=1234' ${url}`);
    });

    it('should build a curl command with the given url, method and multiple cookies', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const cookie = "session=1234, user=JohnDoe";
        const curlBuilder = new CurlBuilder({ url, method, cookie });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST --cookie 'session=1234' --cookie 'user=JohnDoe' ${url}`);
    });

    it('should build a curl command with basic authentication', () => {
        const url = "https://www.example.com";
        const user = "username:password";
        const curlBuilder = new CurlBuilder({ url, user });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET --user 'username:password' ${url}`);
    });

    it('should build a curl command with basic authentication and other options', () => {
        const url = "https://www.example.com";
        const method = "POST";
        const data = '{"key": "value"}';
        const headers = "-H 'Content-Type: application/json'";
        const user = "username:password";
        const curlBuilder = new CurlBuilder({ url, method, data, headers, user });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST -H 'Content-Type: application/json' --data '${data}' --user 'username:password' ${url}`);
    });

    it('should not include --user option when user is not provided', () => {
        const url = "https://www.example.com";
        const curlBuilder = new CurlBuilder({ url });

        const result = curlBuilder.build();

        expect(result).not.toContain("--user");
        expect(result).toBe(`curl -X GET ${url}`);
    });

    it('should build a curl command with proxy', () => {
        const url = "https://www.example.com";
        const proxy = "http://user:password@ProxyHost:8080";
        const curlBuilder = new CurlBuilder({ url, proxy });

        const result = curlBuilder.build();

        expect(result).toContain(`--proxy '${proxy}'`);
        expect(result).toBe(`curl -X GET --proxy '${proxy}' ${url}`);
    });

    it('should include the proxy option with other options', () => {
        const url = "https://www.example.com";
        const method = "POST";
        const headers = "-H 'Content-Type: application/json'";
        const data = '{"name": "John"}';
        const proxy = "https://ProxyUser:ProxyPassword@ProxyHost:8888";
        const curlBuilder = new CurlBuilder({ url, method, headers, data, proxy });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST ${headers} --data '${data}' --proxy '${proxy}' ${url}`);
    });

    it('should not include proxy option when proxy is not provided', () => {
        const url = "https://www.example.com";
        const curlBuilder = new CurlBuilder({ url });

        const result = curlBuilder.build();

        expect(result).not.toContain("--proxy");
        expect(result).toBe(`curl -X GET ${url}`);
    });

    it('should handle multiple options including proxy correctly', () => {
        const url = "https://www.example.com";
        const method = "GET";
        const headers = "-H 'Accept: application/json'";
        const proxy = "socks5://ProxyUser:ProxyPassword@ProxyHost:8888";
        const verbose = true;
        const curlBuilder = new CurlBuilder({ url, method, headers, proxy, verbose });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X GET ${headers} --verbose --proxy '${proxy}' ${url}`);
    });
});