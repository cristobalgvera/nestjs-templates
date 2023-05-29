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
import { BankStandardSuccessResponseDto, ResultDto } from '../dto';
import { ApiBankStandardResponseOptions } from './api-bank-standard-response-options.dto';

type ApiBankStandardSuccessResponseSchema = Record<
  keyof BankStandardSuccessResponseDto<typeof SERVICE_DOMAIN_NAME_CODE>,
  SchemaObject | ReferenceObject
>;

export function ApiBankStandardResponse<TType extends Type<unknown>>(
  type: TType,
  options: ApiBankStandardResponseOptions = {},
) {
  const { description, status, isArray } = options;

  const modelSchema: SchemaObject | ReferenceObject = isArray
    ? { type: 'array', items: { $ref: getSchemaPath(type) } }
    : { $ref: getSchemaPath(type) };

  return applyDecorators(
    ApiExtraModels(ResultDto),
    ApiExtraModels(type),
    ApiResponse({
      status: status ?? DEFAULT_HTTP_STATUS,
      description,
      headers: getBankStandardResponseHeaders(),
      schema: {
        properties: <ApiBankStandardSuccessResponseSchema>{
          Result: { $ref: getSchemaPath(ResultDto) },
          [`Response${SERVICE_DOMAIN_NAME_CODE}`]: modelSchema,
        },
      },
    }),
  );
}
