import { Injectable } from '@nestjs/common';
import { Neo4jConnectorService } from '../shared/neo4j-connector.service';
import { RelationshipDTO } from './users.controller';
import { cypherPipe, match, returnOp, creatRel } from 'src/shared/utils/neo4j';

@Injectable()
export class UsersService {
  private driver = this.neo4jConnectorService.getDriver();

  constructor(private readonly neo4jConnectorService: Neo4jConnectorService) {}

  async getUsers() {
    const { records } = await this.driver.executeQuery(
      'MATCH (n:Person) RETURN n LIMIT 25',
    );

    const res = {
      records: (records || []).map((item) => item.get('n')),
    };

    return res;
  }

  async searchByName(userName: string) {
    const query = cypherPipe(
      match('Person', 'name', userName, 'f'),
      returnOp('f'),
    );

    const { records } = await this.driver.executeQuery(query);

    const res = {
      records: (records || []).map((item) => item.get('f')),
    };

    return res;
  }

  async createRelationship(relationship: RelationshipDTO) {
    const query = cypherPipe(
      match('Person', 'name', relationship.nameFrom, 'f'),
      match('Person', 'name', relationship.nameTo, 't'),
      creatRel('PARENT', 'f', 't'),
    );

    await this.driver.executeQuery(query);

    return;
  }
}
