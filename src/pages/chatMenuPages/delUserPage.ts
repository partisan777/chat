import { Component } from '../../models/components/components';
import delUserPageTemplate from './delUserPage_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';
// import UserController from '../../controllers/userController';
import ChatController from '../../controllers/chatController';
import store from '../../models/components/store';


interface DelUserFormPageProps {
  pageTitle: string;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
  com_isVisible?: boolean;
};

export class DelUserFormPage extends Component {
  constructor(props: DelUserFormPageProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className = "modal";
    if (!props.com_el_id) props.com_el_id = "del-user-page";
    if (!props.com_isVisible) props.com_isVisible = false;
    super(props)
    
  };
  init() {

    this.children.deluser = new Input ({
      label: "user",
      type: "text",
      name: "user",
      elem_id: "del-user-input",
      divErrorClassName: "reg-error",
      divErrorId: "reg-error-del-user-input"
    });

    this.children.deluserbutton = new Button ({
      labelVisible: "Удалить",
      buttonClass:"button-button",
      type: "button",
      elem_id:"del-user-button",
      events: {click: () => {
        this.onSubmit();
        this.hide();
      }}

    })
    
    this.children.closedeluser = new Button ({
      labelVisible: "Закрыть",
      buttonClass: "link-button",
      type: "button",
      elem_id: "close-del-user-button",
      events: {click: () => {this.hide()} }
    });    
  } 
  async onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
          let data = {};
      for (let i: number = 0; i < values.length; i++) {
          data[values[i][0]] = values[i][1];
    }
    //тут по идее надо массив пользователей поддержать, но пока оставлю для одного
    const chatId = store.getState().selectedChat;
    if (!chatId) {
      alert("Выберите чат");
    } else {
      const login: string = values[0][1];
      const chatUsers = await ChatController.getUsers(chatId);
      const userId = chatUsers.filter(item => item.login === login)[0]?.id
      console.log(chatId, userId);
      await ChatController.deleteUsersFromChat(chatId, userId)
      store.set('selectedChat',  undefined);
			ChatController.fetchChats()
    }
  }
  
  render() {
      return this.compile(delUserPageTemplate, this.props);
  }
    
};

