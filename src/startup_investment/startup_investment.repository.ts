import { Startup_investment } from './entities/startup_investment.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Startup_investment)
export class Startup_investmentRepository extends Repository<Startup_investment> {}
