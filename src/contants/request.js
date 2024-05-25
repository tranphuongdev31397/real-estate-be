const HEADER = {
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-refresh-token",
};

const ErrorCode = {
  AccessTokenExpired: "AUTH-AT-EXP",
  RefreshTokenExpired: "AUTH-RT-EXP",
};

module.exports = {
  HEADER,
  ErrorCode,
};
