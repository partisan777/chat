import { Component }  from '../components/components';
import chatsList_tmpl from './chatsList_tmpl.hbs';
import { ChatItem } from '../chatItems/chatItem';
import { withStore } from '../components/store';
import { ChatsAPI } from '../../api/ChatApi';
import ChatsController from '../../controllers/chatController';
import MessagesController from '../../controllers/MessagesController';
import { Link } from '../link/link';
import { ChatInfo } from '../../api/interfaces';


interface chatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
  com_isVisible?: boolean;
}

class ChatsListBase extends Component {
  constructor(props: chatsListProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className = "manage-chat-user";
    if (!props.com_el_id) props.com_el_id = "chat-sidebar-items";
    super({...props});
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
  }

  protected componentDidUpdate(oldProps: chatsListProps, newProps: chatsListProps): boolean {
    this.children.chats = this.createChats(newProps);
    return true;
  }

  private createChats(props: chatsListProps) {
    return props.chats.map(data => {
      return new ChatItem({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          }
        }
      });
    })
  }

  protected render(): DocumentFragment {
    return this.compile(chatsList_tmpl, this.props);
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));



export const ChatsList = withChats(ChatsListBase);




