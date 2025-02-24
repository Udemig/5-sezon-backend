const Joi = require("joi");

const orderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().default(1).required(),
      })
    )
    .required(),

  status: Joi.string().valid("pending", "processing", "completed", "cancelled").default("pending"),

  destination: Joi.object({
    city: Joi.string().required(),
    district: Joi.string().required(),
    street: Joi.string().required(),
    apartment: Joi.number().required(),
    flat: Joi.number().required(),
  }).required(),
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
  orderSchema,
};
