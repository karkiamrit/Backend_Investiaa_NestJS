import { Investor } from './entities/investor.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Investor)
export class InvestorRepository extends Repository<Investor> {
  async findInvestorByUserId(userId: number): Promise<Investor | null> {
    return await this.findOne({ where: { user: { id: userId } } });
  }
}
