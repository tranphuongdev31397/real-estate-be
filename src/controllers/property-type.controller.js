const { BelongsTo, literal, HasMany } = require("sequelize");
const { SuccessResponse } = require("../core/success.response");
const db = require("../models");
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
    sequelize: {
      attributes: { exclude: ["mediaId"] },
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

const createPropertyType = async (req, res, next) => {
  const body = req.body;

  const propertyTypes = await PropertyTypeService.create({
    body,
    find: {
      name: body.name,
    },
  });
  return new SuccessResponse({
    metadata: propertyTypes,
  }).send(res);
};

const updatePropertyType = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;

  const propertyTypes = await PropertyTypeService.update({
    body,
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
  createPropertyType,
  updatePropertyType,
};
