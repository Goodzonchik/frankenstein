import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  person_id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  birth_date: string;
}

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private usersRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Person | null> {
    return this.usersRepository.findOneBy({ person_id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(person: Person): Promise<Person> {
    console.log('create', JSON.stringify(person));
    return this.usersRepository.save(person);
  }
}
