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

const getOnePropertyType = async (req, res, next) => {
  const { id } = req.params;

  const propertyTypes = await PropertyTypeService.getOne({
    id,
  });
  return new SuccessResponse({
    metadata: propertyTypes,
  }).send(res);
};

const deleteOnePropertyType = async (req, res, next) => {
  const { id } = req.params;

  const propertyTypes = await PropertyTypeService.deleteOne({
    id,
  });
  return new SuccessResponse({
    metadata: propertyTypes,
  }).send(res);
};

const deleteManyPropertyTypes = async (req, res, next) => {
  const { ids } = req.body;

  console.log(ids);
  const propertyTypes = await PropertyTypeService.deleteMany({
    ids,
  });
  return new SuccessResponse({
    metadata: propertyTypes,
  }).send(res);
};

module.exports = {
  getPropertiesType,
  getOnePropertyType,
  deleteOnePropertyType,
  deleteManyPropertyTypes,
};
