const { isEmpty, isObject } = require("lodash");
const { Op } = require("sequelize");
const { BadRequestError } = require("../core/error.response");

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

const searchByDefault = (search, searchByFields) => {
  console.log("vo", search);

  if (!search) {
    return;
  }
  if (isObject(search) && !!search?.keyword && search?.searchBy?.length > 0) {
    // Case user defined searchBy
    console.log("first");

    return search;
  }

  if (
    typeof search === "string" &&
    search.length !== 0 &&
    searchByFields.length > 0
  ) {
    // Case user just push search is string and have searchByFields default
    console.log("first");
    return {
      keyword: search,
      searchBy: searchByFields,
    };
  }

  throw new BadRequestError("Search Function is invalid");
};

const filterHandler = (query) => {
  if (!query || isEmpty(query)) return {};

  const { filters, search } = query;

  const searchWhere = searchHandler(search);
  return {
    [Op.and]: {
      ...searchWhere,
    },
  };
};

module.exports = { searchHandler, filterHandler, searchByDefault };

/* DOCUMENT
  - Search function: 
*/
