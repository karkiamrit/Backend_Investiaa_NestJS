import { Project_details } from './entities/project_details.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Project_details)
export class Project_detailsRepository extends Repository<Project_details> {}
