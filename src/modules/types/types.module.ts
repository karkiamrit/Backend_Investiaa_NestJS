import { Module } from '@nestjs/common';
import { YearScalar } from '../types/scalars/year.scalar';

@Module({
  providers: [YearScalar],
})
export class TypeModule {}
