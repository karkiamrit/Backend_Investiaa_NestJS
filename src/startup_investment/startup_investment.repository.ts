import { StartupInvestment } from './entities/startup_investment.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(StartupInvestment)
export class StartupInvestmentRepository extends Repository<StartupInvestment> {}
