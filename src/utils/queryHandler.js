const { isEmpty, isObject } = require("lodash");
const { Op } = require("sequelize");
const { BadRequestError } = require("../core/error.response");

/**
 * The `searchHandler` function processes a search query to generate search conditions based on
 * specified search fields and keywords.
 * @param searchQuery - The `searchHandler` function takes in a `searchQuery` object as a parameter.
 * The `searchQuery` object should have the following structure:
 * @returns An object is being returned with a key of [Op.or] and a value of searchCondition, which is
 * an object containing search conditions for each search field specified in the searchBy array. Each
 * search condition uses the Sequelize operator Op.iLike to perform a case-insensitive search for the
 * trimmed keyword within the specified search field.
 */
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

/**
 * The function `searchByDefault` takes in a search term and search fields, and returns a search object
 * with keyword and searchBy fields based on the input.
 * @param search - The `search` parameter is used to specify the search query that the user wants to
 * perform. It can be a string containing the keyword to search for or an object with the properties
 * `keyword` and `searchBy`.
 * @param searchByFields - `searchByFields` is an array that contains the fields that the user wants to
 * search by.
 * @returns The function `searchByDefault` will return an object with `keyword` and `searchBy`
 * properties if the conditions in the code are met. If the conditions are not met, it will throw a
 * `BadRequestError` with the message "Search Function is invalid".
 */
const searchByDefault = (search, searchByFields) => {
  if (!search) {
    return;
  }
  if (isObject(search) && !!search?.keyword && search?.searchBy?.length > 0) {
    // Case user defined searchBy

    return search;
  }

  if (
    typeof search === "string" &&
    search.length !== 0 &&
    searchByFields.length > 0
  ) {
    // Case user just push search is string and have searchByFields default
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

const sortHandler = (sort) => {
  if (!sort || isEmpty(sort)) return;
  if (!isObject(sort)) {
    throw new BadRequestError("Sort Function is invalid");
  }

  return Object.entries(sort);
};

const pagination = ({ page, limit }) => {
  if (!page || !limit) return;

  if (page <= 0 || limit <= 0) {
    throw new BadRequestError("Invalid page or limit");
  }

  const offset = (page - 1) * limit;

  return { offset, limit: +limit };
};

module.exports = {
  searchHandler,
  filterHandler,
  searchByDefault,
  sortHandler,
  pagination,
};
