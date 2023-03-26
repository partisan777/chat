import { Component } from '../../models/components/components';
import changeAvatarTemplate from './changeAvatar_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';
import UserController from "../../controllers/userController"
import store from '../../models/components/store';
import AuthController from '../../controllers/authController';


interface ChangeAvatarFormPageProps {
  pageTitle?: string;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
	com_isVisible?: boolean;
  message?: string;
};

export class ChangeAvatarFormPage extends Component {
  constructor(props: ChangeAvatarFormPageProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className =  "modal";
    if (!props.com_el_id) props.com_el_id = "change-avatar-page";
    if (!props.com_isVisible) props.com_isVisible = false;
    super(props)
  };
  init() {

    this.children.avatar = new Input ({
      label: "avatar",
      type: "file",
      name: "avatar",
      elem_id: "add-avatar-input",
      divErrorClassName: "reg-error",
      divErrorId: "reg-error-avatar-input",
      events: {
        click: (e: Event) => { 
          // e.preventDefault()
    }}
    });
   
    this.children.addAvatar = new Button ({
      labelVisible: "Добавить",
      buttonClass:"button-button",
      type: "button",
      elem_id:"save-avatar-button",
      events: {
          click: async (e: Event) =>  { 
            let input = document.getElementById("add-avatar-input");
            let data = new FormData()
            if ((input as HTMLInputElement).files) {
              data.append('avatar', (input as HTMLInputElement).files![0])
              const newUser = await UserController.updateAvatar(data);
              store.set('user', newUser)
              let img = document.getElementById('profile-avatar')?.querySelector('img');
              img.setAttribute('src', "https://ya-praktikum.tech/api/v2/resources" + store.getState().user.avatar)
              this.setProps({'message': 'Аватар обновлен'})
            }
            e.preventDefault();
      }}
     
      
    })
    
    this.children.closeAvatarForm = new Button ({
      labelVisible: "Закрыть",
      buttonClass: "link-button",
      type: "button",
      elem_id: "close-add-avatar-button",
      events: {
          click: (e: Event) => { 
            this.hide()
            window.
            e.preventDefault()
      }}
    });
  } 
  
  render() {
      return this.compile(changeAvatarTemplate, this.props);
  }
    
};

