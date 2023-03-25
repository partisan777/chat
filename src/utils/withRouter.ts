import { Component } from '../models/components/components';
import Router from '../models/components/router';

export function withRouter(Block: typeof Component<any>) {
  type Props = typeof Block extends typeof Component<infer P> ? P : any;

  return class WithRouter extends Block {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router;
}

