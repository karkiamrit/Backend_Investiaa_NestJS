import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignInGuard extends AuthGuard('local') {
  constructor(private configService: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isAuthSuccessful = await super.canActivate(context);
      if (!isAuthSuccessful) {
        return false;
      }
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      request.body = ctx.getArgs().input;
      // console.log('user is', request.user);
      console.log(this.configService.get('JWT_PUBLIC_KEY'));
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.body = ctx.getArgs().input;
    return request;
  }
}
