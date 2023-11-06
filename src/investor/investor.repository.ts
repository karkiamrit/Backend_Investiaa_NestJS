import { Investor  } from './entities/investor .entity'
import { CustomRepository } from '../modules/decorators/typeorm.decorator'
import { Repository } from 'typeorm/repository/Repository'

@CustomRepository(Investor )
export class InvestorRepository extends Repository<Investor > {
}
