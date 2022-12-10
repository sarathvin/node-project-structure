module.exports = {
    sendResponse: (res, message, data, statusCode = 200, status = true, err = null) => {
        if (err) {
            console.error(message +' - ', err);
        }
        return res.status(statusCode).send({ result: data, message, status });
    }
}