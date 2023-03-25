import { Component } from "../../models/components/components";
import mainWindowTemplate from './mainWindow_tpls.hbs';
import { ChatItem } from "../../models/chatItems/chatItem";
import { MessengerHeaderPage} from "../messengerHeader/messengerHeader";
import { Messenger, MessengerBase }  from "../messenger/messenger";
import { ChatsList } from "../../models/chatList/chatList";
import ChatsController from "../../controllers/chatController"

interface MainWindowProps {
	pageTitle?: string;
	eventsAddFileButton?: object;
	eventsChatMenuButton?: object;
	eventsProfileButton?: object;
	com_className?: string;
    com_el_id?: string;
    com_tagName?: string;
    com_isVisible?: boolean;
  };
  

export class MainWindowPage extends Component {
	protected chatList: ChatItem[];
	constructor(props: MainWindowProps) {
		if (!props.com_tagName) props.com_tagName = 'div';
    	if (!props.com_className) props.com_className = 'chat-window';
    	if (!props.com_el_id) props.com_el_id = 'chat-window';
		if (!props.com_isVisible) props.com_isVisible = true;
		super(props)
	}
	init() {
        this.children.messengerHeader = new MessengerHeaderPage({})
		this.children.messenger = new Messenger({});
		this.children.chatsList = new ChatsList({ isLoaded: false });
		

		ChatsController.fetchChats().finally(() => {
			(this.children.chatsList as Component).setProps({
			  isLoaded: true          
			})
			
		  });
	}	
	render() {
		return this.compile(mainWindowTemplate, this.props);
    }
};



