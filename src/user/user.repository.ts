import { CustomRepository } from '../modules/decorators/typeorm.decorator';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    // async getByPhone(phone: string) {
    //     return this.findOne({ where: { phone } });
    // }
}
