import { Type, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiBankStandardRequestOptions } from './api-bank-standard-request-options.dto';
import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';

export function ApiBankStandardRequest<TType extends Type<unknown>>(
  type: TType,
  options: ApiBankStandardRequestOptions = {},
) {
  const { isArray, description } = options;

  const modelSchema: SchemaObject | ReferenceObject = isArray
    ? { type: 'array', items: { $ref: getSchemaPath(type) } }
    : { $ref: getSchemaPath(type) };

  return applyDecorators(
    ApiExtraModels(type),
    ApiBody({
      description,
      schema: {
        properties: {
          [`Request${SERVICE_DOMAIN_NAME_CODE}`]: modelSchema,
        },
      },
    }),
  );
}
