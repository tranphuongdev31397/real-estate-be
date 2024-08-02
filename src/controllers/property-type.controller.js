const { SuccessResponse } = require("../core/success.response");
const PropertyTypeService = require("../services/property-type.service");

const getPropertiesType = async (req, res, next) => {
  const { filters } = req.query;

  const propertyTypes = await PropertyTypeService.getAllPropertyTypes({
    filters,
  });

  return new SuccessResponse({
    metadata: propertyTypes,
  }).send(res);
};

module.exports = {
  getPropertiesType,
};
