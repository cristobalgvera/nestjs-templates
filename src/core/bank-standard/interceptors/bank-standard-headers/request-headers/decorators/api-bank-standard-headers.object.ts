import { BankStandardHeadersOptions } from './api-bank-standard-headers-options.dto';

export const bankStandardHeaders: BankStandardHeadersOptions[] = [
  {
    name: 'consumer-sys-code',
    description: 'Unique code that represents the system',
    required: true,
  },
  {
    name: 'consumer-enterprise-code',
    description: 'Unique code that represents the enterprise',
    required: true,
  },
  {
    name: 'consumer-country-code',
    description:
      'Unique code that represents the country from which the request is originated',
    required: true,
  },
  {
    name: 'trace-client-req-timestamp',
    description: 'Timestamp of the request',
    required: true,
    schema: { format: 'date', example: '2021-01-01T00:00:00.000Z' },
  },
  {
    name: 'trace-event-id',
    description: 'Unique code that identify the consumer event',
  },
  {
    name: 'trace-source-id',
    required: true,
    description:
      'Unique identifier of the execution, that identifies the consumer event',
  },
  {
    name: 'channel-name',
    required: true,
    description: 'Unique code of the channel that is being used',
  },
  {
    name: 'channel-mode',
    required: true,
    description:
      'Unique code that identify the channel mode that is being used',
  },
];
