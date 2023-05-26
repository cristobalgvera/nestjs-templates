import * as Joi from 'joi';
import { BankStandardRequestHeadersDto } from './bank-standard-request-headers.dto';

const stringOrEmpty = Joi.string().allow('');

const schema: Joi.StrictSchemaMap<BankStandardRequestHeadersDto> = {
  'consumer-sys-code': Joi.string().required(),
  'consumer-enterprise-code': Joi.string().required(),
  'consumer-country-code': Joi.string().required(),
  'trace-client-req-timestamp': Joi.date(),
  'trace-process-id': stringOrEmpty,
  'trace-event-id': stringOrEmpty,
  'trace-source-id': stringOrEmpty,
  'trace-conversation-id': stringOrEmpty,
  'trace-service-code': stringOrEmpty,
  'trace-service-name': stringOrEmpty,
  'trace-service-operation': stringOrEmpty,
  'channel-name': stringOrEmpty,
  'channel-mode': stringOrEmpty,
};

export const bankStandardRequestHeadersSchema = Joi.object<
  BankStandardRequestHeadersDto,
  true
>(schema).unknown();
