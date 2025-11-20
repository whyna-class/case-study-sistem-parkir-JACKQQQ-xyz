import { Module } from '@nestjs/common';
import { ParkirModule } from './parkir/parkir.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [PrismaModule, ParkirModule],
  controllers: [],
  providers: [],
})
export class AppModule { }