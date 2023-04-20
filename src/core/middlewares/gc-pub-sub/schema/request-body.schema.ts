import * as Joi from 'joi';

export type RequestBody = {
  message: {
    attributes?: Record<string, unknown>;
    data: string;
    messageId?: string;
    publishTime?: string;
  };
  subscription: string;
};

export const requestBodySchema = Joi.object<RequestBody, true>({
  message: Joi.object<RequestBody['message'], true>({
    attributes: Joi.object().pattern(
      Joi.string(),
      Joi.alternatives(Joi.string(), Joi.number(), Joi.boolean()),
    ),
    data: Joi.string().base64().required(),
    messageId: Joi.string(),
    publishTime: Joi.string(),
  })
    .unknown()
    .required(),
  subscription: Joi.string().required(),
}).unknown();
