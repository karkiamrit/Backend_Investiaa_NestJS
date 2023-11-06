import { Project } from './entities/project.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async findProjectsByEntrepreneurId(entrepreneurId: number) {
    const projects = await this.createQueryBuilder('project')
      .where('project.entrepreneur.id = :entrepreneurId', { entrepreneurId })
      .getMany();
    return projects;
  }
}
