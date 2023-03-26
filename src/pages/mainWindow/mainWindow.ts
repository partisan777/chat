import { Component } from "../../models/components/components";
import mainWindowTemplate from './mainWindow_tpls.hbs';
import { ChatItem } from "../../models/chatItems/chatItem";
import { Messenger, MessengerBase }  from "../messenger/messenger";
import { ChatsList } from "../../models/chatList/chatList";
import ChatsController from "../../controllers/chatController"
import { Link } from "../../models/link/link";
import { Button } from "../../models/button/button";
import { Input } from "../../models/input/input";
import { CreateChatFormPage } from "../createChat/createChat";
import store from "../../models/components/store";

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
        this.children.messenger = new Messenger({});
		this.children.chatsList = new ChatsList({ isLoaded: false });
		
		this.children.changePasswordFormPage = new CreateChatFormPage({pageTitle: 'Создать чат'})

		
		this.children.linkToProfile = new Link({
            label: 'Профиль>',
            to: '/profile',
			com_el_id: "profile-link-div"
          });

        this.children.searchInput = new Input ({ 
			type: "search",
			name: "search",
			elem_id: "search"    
		});

		this.children.searchButton = new Button ({
			labelVisible: "Поиск",
			buttonClass: "button-button",
			type: "button",
			elem_id: "profile-search-button",
			com_el_id: "profile-search-button-div"
			
		});
		this.children.deleteChatButton = new Button ({
			labelVisible: "Удалить чат",
			buttonClass: "button-button",
			type: "button",
			elem_id: "delete-chat-button",
			com_el_id: "delete-chat-button-div",
			events: {
			  click: () => {
				const chatId = store.getState().selectedChat
				if (!chatId) {
					alert("Выберите чат");
				} else {
					const chatName = store.getState().chats.filter((item => item.id === chatId))[0]?.title
					let result = confirm(`Удалить чат ${chatName}`);
					if (result) {
						console.log(chatId);
						ChatsController.delete(chatId);
					}
				}	
			  }}
		});

		this.children.createChatButton = new Button ({
			labelVisible: 'Создать чат',
			buttonClass: "button-button",
			// type: "button",
			elem_id: "create-chat-button",
			events: {
			  click: (e: Event) => {
				e.preventDefault();
				this.children.changePasswordFormPage.changeVisible();
			  }},
			com_el_id: "create-chat-button-div"  
		  });

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



