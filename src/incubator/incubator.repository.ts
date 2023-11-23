import { Incubator } from './entities/incubator.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Incubator)
export class IncubatorRepository extends Repository<Incubator> {
  async findIncubatorByUserId(userId: number): Promise<Incubator | null> {
    return await this.findOne({ where: { user: { id: userId } } });
  }
}
