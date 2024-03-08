function confirmation({prefixVal = "ask", name, message, valueDefault = true}) {
    if (!name || !message) {
        throw new Error("name and message are required");
    }

    return {
        type: "confirm",
        name: `${prefixVal}${name}`,
        message,
        default: valueDefault,
        prefixVal: prefixVal,
        onlyName: name,
    };
}

module.exports = confirmation;