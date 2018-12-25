validator = (data, requirements, callback) => {
    let bool = false;

    const unfullfiled = requirements.filter((req) => {
        requirement = data[req];
        if (requirement) {
            // Return false if the data exists and is defined
            // TODO: implement check for data
            return false;
        } else {
            // Return true if the data exists but is not defined
            return true;
        };
        // Return true if the data is not defined
        return true;
    });
    bool = unfullfiled.length === 0;
    callback(bool);
};

module.exports = validator;