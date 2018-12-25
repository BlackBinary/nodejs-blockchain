responseCreator = (boolean, data, callback) => {
    callback({
        status: boolean ? "success" : "failed",
        data
    });
};

module.exports = responseCreator;