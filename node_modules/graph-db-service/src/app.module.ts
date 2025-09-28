import { Module } from '@nestjs/common';
import { Neo4jConnectorService } from './shared/neo4j-connector.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  providers: [Neo4jConnectorService],
})
export class AppModule {}
