import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { Person, PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
