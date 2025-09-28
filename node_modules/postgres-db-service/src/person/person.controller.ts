import { Body, Controller, Get, Post } from '@nestjs/common';
import { Person, PersonService } from './person.service.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getPersons(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Post()
  createPerson(@Body() person: Person): Promise<Person> {
    return this.personService.create(person);
  }
}
