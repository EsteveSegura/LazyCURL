function confirmation({prefix = "ask", name, message, valueDefault = true}) {
    if (!name || !message) {
        throw new Error("name and message are required");
    }

    return {
        type: "confirm",
        name: `${prefix}${name}`,
        message,
        default: valueDefault,
        prefix: prefix,
        onlyName: name,
    };
}

export default confirmation;