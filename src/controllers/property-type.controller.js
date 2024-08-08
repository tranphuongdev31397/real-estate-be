const { SuccessResponse } = require("../core/success.response");
const PropertyTypeService = require("../services/property-type.service");

const getPropertiesType = async (req, res, next) => {
  const { filters, search, sort, page, limit } = req.query;

  const propertyTypes = await PropertyTypeService.getList({
    filters,
    search,
    sort,
    page,
    limit,
    options: {
      searchDefault: ["name"],
    },
  });

  return new SuccessResponse({
    metadata: propertyTypes,
  }).send(res);
};

module.exports = {
  getPropertiesType,
};
