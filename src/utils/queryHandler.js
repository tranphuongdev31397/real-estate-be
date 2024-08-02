const { isEmpty } = require("lodash");
const { Op } = require("sequelize");

const searchHandler = (searchQuery) => {
  if (!searchQuery || isEmpty(searchQuery)) return {};

  const { searchBy, keyword } = searchQuery || {};

  const trimKeyword = keyword.trim();

  if (!searchBy || searchBy.length === 0 || trimKeyword.length === 0) {
    return {};
  }
  //searchBy is array
  const searchCondition = searchBy.reduce((prev, searchField) => {
    return {
      ...prev,
      ...{
        [searchField]: {
          [Op.iLike]: `%${trimKeyword}%`,
        },
      },
    };
  }, {});

  return { [Op.or]: searchCondition };
};

const filterHandler = (filters) => {
  if (!filters || isEmpty(filters)) return {};
  const searchWhere = searchHandler(filters.search);

  return {
    [Op.and]: {
      ...searchWhere,
    },
  };
};

module.exports = { searchHandler, filterHandler };
