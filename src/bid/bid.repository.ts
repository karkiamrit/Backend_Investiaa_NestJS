import { Bid } from './entities/bid.entity';
import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';

@CustomRepository(Bid)
export class BidRepository extends Repository<Bid> {}
