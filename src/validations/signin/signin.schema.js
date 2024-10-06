import Joi from "joi";

const signinSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ tlds: { allow: false } }),
});

export default signinSchema;
