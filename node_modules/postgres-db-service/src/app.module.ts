import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person/person.service';

@Module({
  imports: [
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.18.0.7',
      port: 5432,
      username: 'victor',
      password: 'victor',
      database: 'frankenstein',
      entities: [Person],
      synchronize: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
