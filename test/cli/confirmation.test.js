const confirmation = require("../../src/cli/confirmation.js");

describe("confirmation", () => {
    test("should return a object with the properties", () => {
        const result = confirmation({name: "headers", message: "¿Desea ejecutar el comando curl?", valueDefault: false});
        expect(result).toEqual({
            type: 'confirm',
            name: 'askheaders',
            message: '¿Desea ejecutar el comando curl?',
            default: false,
            prefix: 'ask',
            onlyName: 'headers'
        });
    });

    test("should throw an error if name is not provided", () => {
        expect(() => confirmation({message: "¿Desea ejecutar el comando curl?", valueDefault: false})).toThrow("name and message are required");
    });

    test("should throw an error if message is not provided", () => {
        expect(() => confirmation({name: "headers", valueDefault: false})).toThrow("name and message are required");
    });
});