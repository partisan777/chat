import { Component } from '../../models/components/components';
import addUserPageTemplate from './addUserPage_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';
import ChatsController from '../../controllers/chatController';
import store from '../../models/components/store';
import UserController from '../../controllers/userController'

interface AddUserFormPageProps {
  pageTitle: string;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
	com_isVisible?: boolean;
};

export class AddUserFormPage extends Component {
  constructor(props: AddUserFormPageProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className =  "modal";
    if (!props.com_el_id) props.com_el_id = "add-user-page";
    if (!props.com_isVisible) props.com_isVisible = false;
    super(props)
  };
  init() {

    this.children.adduser = new Input ({
      label: "user",
      type: "text",
      name: "login",
      elem_id: "add-user-input",
      divErrorClassName: "reg-error",
      divErrorId: "reg-error-add-user-input"
    });

    this.children.adduserbutton = new Button ({
      labelVisible: "Добавить",
      buttonClass:"button-button",
      type: "button",
      elem_id:"add-user-button",
      events: {click: () => {
        this.onSubmit()
        this.hide()} }
    })
    
    this.children.closeadduser = new Button ({
      labelVisible: "Закрыть",
      buttonClass: "link-button",
      type: "button",
      elem_id: "close-add-user-button",
      events: {click: () => {this.hide()} }
    });
  }
  async onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
    let login: string;
    for (let i: number = 0; i < values.length; i++) {
      login = values[i][1];
    }
    const users = await UserController.search(login);
    const userId = users[0].id;
    ChatsController.addUserToChat(store.getState().selectedChat, userId);
  }
  
  render() {
      return this.compile(addUserPageTemplate, this.props);
  }
    
};

