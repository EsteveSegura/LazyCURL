const InvalidUserFormat = require("./invalid-user-format");

class User {
    constructor() {
        this.name = "user";
        this.message = "Enter the username and password for basic authentication (format: 'username:password'):";
    }

    validate({ authString }) {
        if (!authString || !authString.includes(":")) {
            throw new InvalidUserFormat({ message: "Invalid authentication format, please use the format 'username:password' and try again." });
        }

        const [username, password] = authString.split(":");
        if (!username || !password) {
            throw new InvalidUserFormat({ message: "Both username and password are required." });
        }

        return true;
    }
}

module.exports = User;