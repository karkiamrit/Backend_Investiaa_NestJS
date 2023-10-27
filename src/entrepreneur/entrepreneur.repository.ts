import { Entrepreneur } from './entities/entrepreneur.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Entrepreneur)
export class EntrepreneurRepository extends Repository<Entrepreneur> {}
