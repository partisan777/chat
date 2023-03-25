import { Component } from '../../models/components/components';
import changePasswordTemplate from './changePassword_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';
import UserController from '../../controllers/userController';

interface ChangePasswordFormPageProps {
  pageTitle: string;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
	com_isVisible?: boolean;
};

export class ChangePasswordFormPage extends Component {
  constructor(props: ChangePasswordFormPageProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className = "modal";
    if (!props.com_el_id) props.com_el_id = "change-password-page";
    if (!props.com_isVisible) props.com_isVisible = false;
    super(props)
  };
  init() {

    this.children.oldpassword = new Input ({
      label: "oldpassword",
      labelVisible: "Текущий пароль",
      type: "password",
      name: "oldPassword",
      elem_id: "old-password",
      autocomplete: "on",
      placeholder: "Введите пароль",
      checkType: "oldpassword",
      divErrorClassName: "reg-error",
      divErrorId: "error-current-password",
      divErrorCheckType:  "oldpassword"
    }); 

    this.children.newpassword = new Input ({
      label: "newpassword",
      labelVisible: "Новый пароль",
      type: "password",
      name: "newPassword",
      elem_id: "new-password",
      autocomplete: "on",
      placeholder: "Введите пароль",
      checkType: "newpassword",
      divErrorClassName: "reg-error",
      divErrorId: "error-current-password",
      divErrorCheckType: "newpassword"
    }); 

    this.children.newpasswordconfirm = new Input ({
      label: "new-password-confirm",
      labelVisible:"Повторите пароль",
      type: "password",
      name: "newPassword-confirm",
      elem_id: "new-password-confirm",
      autocomplete: "on",
      placeholder: "Введите повтор пароля",
      checkType: "newconfirmpassword",
      divErrorClassName: "reg-error",
      divErrorId: "error-new-password-confirm",
      divErrorCheckType:  "newconfirmpassword"
    });

    this.children.changePassword =  new Button ({
      labelVisible: "Сменить пароль",
      buttonClass: "button-button",
      type: "submit",
      elem_id: "registration-button",
      events: { click: (e: Event) => { 
        this.onSubmit(); 
        e.preventDefault()
      }}
    }); 

    this.children.closeChangePassword  =  new Button ({
      labelVisible: "Закрыть",
      buttonClass: "link-button",
      type: "button",
      elem_id: "close-change-password-form-button",
      events: { click: (e: Event) => { 
          this.hide();          
      }}
    })
  }
  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
    let data = {};
    for (let i: number = 0; i < values.length; i++) {
      if (values[i][0] === "newPassword-confirm") {
        continue;
      }  
      data[values[i][0]] = values[i][1]
    }
    UserController.updatePassword(data);
  }
  render() {
      return this.compile(changePasswordTemplate, this.props);
  }
};



