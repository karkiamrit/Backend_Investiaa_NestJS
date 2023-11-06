import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Year')
export class YearScalar implements CustomScalar<number, Date> {
  description = 'Year custom scalar type';

  parseValue(value: number): Date {
    return new Date(value, 0); // Assuming value is a year (e.g., 2023)
  }

  serialize(value: Date): number {
    return value.getFullYear();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return this.parseValue(parseInt(ast.value, 10));
    }
    return null;
  }
}
