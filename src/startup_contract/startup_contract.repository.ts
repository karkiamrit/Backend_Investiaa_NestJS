import { StartupContract } from './entities/startup_contract.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(StartupContract)
export class StartupContractRepository extends Repository<StartupContract> {}
