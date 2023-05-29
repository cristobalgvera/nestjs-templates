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
    schema: { format: 'date' },
  },
  {
    name: 'trace-process-id',
    description: 'Code that identify the business process',
  },
  {
    name: 'trace-event-id',
    description: 'Unique code that identify the consumer event',
  },
  {
    name: 'trace-source-id',
    description: 'Additional identifier of the consumer',
  },
  {
    name: 'trace-conversation-id',
    description: 'Unique code that identify the conversation',
  },
  {
    name: 'trace-service-code',
    description:
      'Unique code that identify the service from which the request is originated',
  },
  {
    name: 'trace-service-name',
    description: 'Name of the service that executes the consumer',
  },
  {
    name: 'trace-service-operation',
    description: 'Name of the operation that executes the consumer',
  },
  {
    name: 'channel-name',
    description: 'Unique code of the channel that is being used',
  },
  {
    name: 'channel-mode',
    description:
      'Unique code that identify the channel mode that is being used',
  },
];
