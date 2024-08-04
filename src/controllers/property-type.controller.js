const { SuccessResponse } = require("../core/success.response");
const PropertyTypeService = require("../services/property-type.service");

const getPropertiesType = async (req, res, next) => {
  const { filters, search, sort, page, limit } = req.query;

  const propertyTypes = await PropertyTypeService.getAllPropertyTypes({
    filters,
    search,
    sort,
  });

  return new SuccessResponse({
    metadata: propertyTypes,
  }).send(res);
};

module.exports = {
  getPropertiesType,
};
