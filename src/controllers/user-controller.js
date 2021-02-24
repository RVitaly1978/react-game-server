const ApiError = require('../error/api-error');

exports.getUsers = async (req, res, next) => {
  res.send('запрос за юзером');
  // return next(ApiError.internal('Проверка работы ошибок'));
};
