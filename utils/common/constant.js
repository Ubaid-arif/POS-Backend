// declare all constant variable here
module.exports.httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

const pagination_constructor = (offset, limit) => {
  return {
    skip: +offset || 0,
    take: +limit || 10,
  };
};

module.exports = {
  pagination_constructor,
};
