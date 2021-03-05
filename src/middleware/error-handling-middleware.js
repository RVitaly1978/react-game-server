const ApiError = require('../error/api-error');

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }

  return res.status(500).json({ message: 'Unexpected error' });
};
