import * as Joi from 'joi';
import { BankStandardRequestHeadersDto } from './bank-standard-request-headers.dto';

const schema: Joi.StrictSchemaMap<BankStandardRequestHeadersDto> = {
  'consumer-sys-code': Joi.string().required(),
  'consumer-enterprise-code': Joi.string().required(),
  'consumer-country-code': Joi.string().required(),
  'trace-client-req-timestamp': Joi.string().isoDate().required(),
  'trace-source-id': Joi.string().required(),
  'trace-event-id': Joi.string().allow(''),
  'channel-name': Joi.string().required(),
  'channel-mode': Joi.string().required(),
};

export const bankStandardRequestHeadersSchema = Joi.object<
  BankStandardRequestHeadersDto,
  true
>(schema).unknown();
