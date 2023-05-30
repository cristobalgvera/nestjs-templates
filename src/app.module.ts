import {
  BankStandardHttpModule,
  BankStandardModule,
} from '@core/bank-standard';
import { EnvironmentModule } from '@core/environment';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [
    EnvironmentModule,
    // TODO: Set proper values for response headers
    BankStandardModule.forRoot({
      headers: {
        responseHeaders: {
          'Local-Transaction-Id': '[CHANGE_ME] local-transaction-id',
        },
      },
    }),
    // TODO: Set proper values for HTTP requests headers
    BankStandardHttpModule.forRoot({
      headers: {
        'consumer-sys-code': '[CHANGE_ME] consumer-sys-code',
        'consumer-enterprise-code': '[CHANGE_ME] consumer-enterprise-code',
        'consumer-country-code': '[CHANGE_ME] consumer-country-code',
        'trace-event-id': '[CHANGE_ME] trace-event-id',
        'channel-name': '[CHANGE_ME] channel-name',
        'channel-mode': '[CHANGE_ME] channel-mode',
      },
    }),
  ],
  providers: [Logger],
})
export class AppModule {}
