exports.success = function (req, res, message, status) {
    res.status(status || 200).send({
        sucess: true,
        message: message
    });
}

exports.error = function (req, res, error, status) {
    res.status(status || 500).send({
        sucess: false,
        error: error
    });
}

exports.getAllData = function (req, res, data, status) {
    res.status(status || 200).send({
        sucess: true,
        data: data
    });
}