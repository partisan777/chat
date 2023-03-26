import { set } from '../../utils/helpers';
import { EventBus } from './eventBus';
import { Component } from './components';
import { ChatInfo, User } from '../../api/interfaces';
import { Message } from '../../controllers/messagesController';

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

window.store = store;

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Component<SP & P>){

    return class WithStore extends Component {

      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });

      }

    }

  }
}

export default store;


