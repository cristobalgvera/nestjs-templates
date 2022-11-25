import { Module } from '@nestjs/common';
import { ChargesModule } from './charges';

@Module({
  imports: [ChargesModule],
})
export class AppModule {}
