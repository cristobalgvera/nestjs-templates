import * as Joi from 'joi';

export type EventPattern = {
  pattern: string;
  data: string | number | boolean | Record<string, unknown>;
};

export const eventPatternSchema = Joi.object<EventPattern, true>({
  pattern: Joi.string().required(),
  data: Joi.alternatives(
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
    Joi.object(),
  ).required(),
}).unknown();
