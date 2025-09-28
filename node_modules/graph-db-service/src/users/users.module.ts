import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Neo4jConnectorService } from 'src/shared/neo4j-connector.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Neo4jConnectorService],
})
export class UsersModule {}
