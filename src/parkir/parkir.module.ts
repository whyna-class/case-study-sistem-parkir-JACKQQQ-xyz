import { Module } from '@nestjs/common';
import { ParkirService } from './parkir.service';
import { ParkirController } from './parkir.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  controllers: [ParkirController],
  providers: [ParkirService],
  imports: [PrismaModule],
})
export class ParkirModule { }