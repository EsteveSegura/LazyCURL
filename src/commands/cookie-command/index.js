const InvalidCookieFormat = require("./invalid-cookie-format.js");

class Cookie {
    constructor() {
        this.name = "cookie";
        this.message = "Enter the cookies\n(separated by commas: 'cookieName=cookieValue, cookieName2=cookieValue2'):";
    }

    validate({ cookieString }) {
        if(!cookieString) {
            throw new InvalidCookieFormat({ message: "Cookies are required" });
        }

        const cookies = cookieString.trim().split(",").map(cookie => cookie.trim());
        const isValidated = cookies.every(cookie => cookie.includes("="));

        if(!isValidated) {
            throw new InvalidCookieFormat({ message: "Invalid cookie format, please add an equal sign (=) between the cookie and the value, and try again" });
        }

        return true;
    }
}

module.exports = Cookie;    