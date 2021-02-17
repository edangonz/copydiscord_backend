exports.success = function(req, res, code, body, message, status, details) {
    console.log(details);

    res.status(status || 200).send({
        code: code,
        body: body,
        message: message
    })
};

exports.error = function(req, res, code, message, status, details) {
    console.log(details);

    res.status(status || 500).send({
        code: code,
        body: '',
        message: message,
    });
};