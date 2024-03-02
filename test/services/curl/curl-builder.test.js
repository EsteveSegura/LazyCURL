import CurlBuilder from "../../../src/infrastructure/services/curl/curl-builder";

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

        expect(result).toBe(`curl -X GET ${url} -H 'Content-Type: application/json'`);
    });

    it('should build a curl command with the given url, method and multiple headers', () => {
        const url = "https://www.google.com";
        const method = "POST";
        const headers = "-H 'Content-Type: application/json' -H 'Authorization: Bearer 1234'";
        const curlBuilder = new CurlBuilder({ url, method, headers });

        const result = curlBuilder.build();

        expect(result).toBe(`curl -X POST ${url} -H 'Content-Type: application/json' -H 'Authorization: Bearer 1234'`);
    });
});