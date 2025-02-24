const Joi = require("joi");
const { defaultImageUrl } = require("../constants");

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required().default(0),
  category: Joi.string().required(),
  imageUrl: Joi.string().default(defaultImageUrl),
  isActive: Joi.boolean().default(true),
});

async function validateDto(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(",");

    throw new Error(messages);
  }

  return value;
}

module.exports = {
  validateDto,
  productSchema,
};
