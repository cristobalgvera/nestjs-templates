import {
  DEFAULT_HTTP_STATUS,
  SERVICE_DOMAIN_NAME_CODE,
} from '@core/bank-standard/constants';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { getBankStandardResponseHeaders } from '../../bank-standard-headers';
import { BankStandardResponseDto, ResultDto } from '../dto';
import { ApiBankStandardResponseOptions } from './api-bank-standard-response-options.dto';

type ApiBankStandardResponseSchema = Record<
  keyof BankStandardResponseDto<typeof SERVICE_DOMAIN_NAME_CODE>,
  SchemaObject | ReferenceObject
>;

export function ApiBankStandardResponse<TType extends Type<unknown>>(
  type?: TType,
  options: ApiBankStandardResponseOptions = {},
) {
  const { description, status, isArray } = options;

  const bankResponseSchema = {} as Record<
    string,
    SchemaObject | ReferenceObject
  >;

  if (type !== undefined)
    bankResponseSchema[`Response${SERVICE_DOMAIN_NAME_CODE}`] = isArray
      ? { type: 'array', items: { $ref: getSchemaPath(type) } }
      : { $ref: getSchemaPath(type) };

  return applyDecorators(
    ApiExtraModels(ResultDto),
    ApiExtraModels(type ?? ResultDto),
    ApiResponse({
      status: status ?? DEFAULT_HTTP_STATUS,
      description,
      headers: getBankStandardResponseHeaders(),
      schema: {
        properties: <ApiBankStandardResponseSchema>{
          Result: { $ref: getSchemaPath(ResultDto) },
          ...bankResponseSchema,
        },
      },
    }),
  );
}
