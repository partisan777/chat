import profilePageTemplate from './profileForm_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';
import { Component } from '../../models/components/components';
import { checkValueInput } from "../../utils/formValidate"
import  AuthController from '../../controllers/authController';
import store, { withStore }  from '../../models/components/store';
import UserController from '../../controllers/userController';
import { Link } from '../../models/link/link';
import { ChangePasswordFormPage } from "../changePassword/changePassword";
import { ChangeAvatarFormPage } from "../changeAvatar/changeAvatar";
// import { profile } from '../../utils/const';

interface ProfileFormPageProps {
  pageTitle?: string;
  profile?: object;
  profileLogoutEvents?: object;
  changeAvatarEvents?: object;
  profileExitEvents?: object;
  profileChangePasswordEvents?: object;
  events?: object;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
  com_isVisible?: boolean;
};


export class ProfileFormPage extends Component {
  protected avatarLink: string;
  constructor(props: ProfileFormPageProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className = 'profile-main';
    if (!props.com_el_id) props.com_el_id = 'profile-main';
    if (!props.com_isVisible) props.com_isVisible = false;
    super(props);
  };
  init() {
    let profile = store.getState().user;
    this.props.avatarLink = "https://ya-praktikum.tech/api/v2/resources" + profile.avatar;
    
    
    this.children.changePasswordFormPage = new ChangePasswordFormPage({pageTitle: 'Изменение пароля'});
    this.children.changeAvatarFormPage = new ChangeAvatarFormPage({pageTitle: 'Изменение аватара'});
    
    this.children.email = new Input ({
        label: "pr-form-email",
        labelVisible: "Почта",
        type: "text",
        elem_id: "pr-form-email",
        name: "email",
        value: profile.email, 
        divErrorClassName: "reg-error",
        divErrorId: "pr-form-email-error",
        errormessage: '',
        divErrorCheckType: "email",
        events: {
            blur: (e: Event) => { 
                const {name, currentError, currentValue} = checkValueInput(e);
                console.log(name, currentError, currentValue)
                this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
            }
        }   
    }); 
        
    this.children.login = new Input ({
        label: "pr-form-login",
        labelVisible:"Логин",
        type: "text",
        elem_id: "pr-form-login",
        name: "login",
        value: profile.login,
        divErrorClassName: "reg-error",
        divErrorId: "pr-form-login-error",
        errormessage: '',
        divErrorCheckType: "login",
        events: {
            blur: (e: Event) => { 
                const {name, currentError, currentValue} = checkValueInput(e);
                console.log(name, currentError, currentValue);
                this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
            }
        }   
      });
      
    this.children.first_name = new Input ({
        label: "pr-form-first-name",
        labelVisible:"Имя",
        type: "text",
        elem_id: "pr-form-first-name",
        name: "first_name",
        value: profile.first_name,
        divErrorClassName: "reg-error",
        divErrorId: "pr-form-first_name-error",
        errormessage: '',
        divErrorCheckType: "first_name",
        events: {
            blur: (e: Event) => { 
                const {name, currentError, currentValue} = checkValueInput(e);
                console.log(name, currentError, currentValue);
                this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
            }
        }   
    });
    
    this.children.second_name = new Input ({ 
        label: "pr-form-second_name",
        labelVisible:"Фамилия",
        type: "text",
        elem_id: "pr-form-second_name",
        name: "second_name",
        value: profile.second_name,
        divErrorClassName: "reg-error",
        divErrorId: "pr-form-second_name-error",
        errormessage: '',
        divErrorCheckType: "second_name",
        events: {
            blur: (e: Event) => { 
                const {name, currentError, currentValue} = checkValueInput(e);
                console.log(name, currentError, currentValue);
                this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
            }
        }   
    });     

    this.children.display_name = new Input ({ 
        label: "pr-form-display_name",
        labelVisible:"Имя в чате",
        type: "text",
        elem_id: "pr-form-display_name",
        name: "display_name",
        value: profile.display_name,
        divErrorClassName: "reg-error",
        divErrorId: "pr-form-display_name-error",
        errormessage: '',
        divErrorCheckType: "display_name",
        events: {
            blur: (e: Event) => { 
                const {name, currentError, currentValue} = checkValueInput(e);
                console.log(name, currentError, currentValue);
                this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
            }
        }   
    });

    this.children.phone = new Input ({ 
        label: "pr-form-phone",
        labelVisible:"Телефон",
        type: "text",
        elem_id: "pr-form-phone",
        name: "phone",
        value: profile.phone,
        divErrorClassName: "reg-error",
        divErrorId: "pr-form-phone-error",
        errormessage: '',
        divErrorCheckType: "phone",
        events: {
            blur: (e: Event) => { 
                const {name, currentError, currentValue} = checkValueInput(e);
                console.log(name, currentError, currentValue);
                this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
            }
        }   
    });
    
    this.children.profileChangeData =  new Button ({
        labelVisible: "Сохранить данные",
        buttonClass: "link-button",
        elem_id:"profile-change-data",
        type: "submit",
        events: {
            click: (e: Event) => { 
                this.onSubmit()
                e.preventDefault();
            }
        }   
    });
  
    this.children.profileChangePassword = new Button ({
        labelVisible: "Изменить пароль",
        buttonClass: "link-button",
        elem_id:"profile-change-password",
        type: "button",
        events: {
            click: (e: Event) => { 
                e.preventDefault();
                this.children.changePasswordFormPage.changeVisible();
            }
        }   
    });
  
    this.children.profileLogout = new Button ({
        labelVisible: "Выйти",
        buttonClass: "button-button",
        elem_id:"profile-logout",
        type: "button",
        events: {
            click: () => {AuthController.logout();}
        }
        
    });

    this.children.changeAvatar = new Button ({
        labelVisible: "Изменить изображение",
        buttonClass: "link-button",
        elem_id:"change-avatar-button",
        type: "button",
        events: {
            click: (e: Event) => { 
                e.preventDefault();
                this.children.changeAvatarFormPage.changeVisible();
            }
        }   
    });
  
    this.children.linkToMessenger = new Link({
        label: '<Назад',
        to: '/messenger'
      });
    }
    onSubmit() {
        const values = Object
          .values(this.children)
          .filter(child => child instanceof Input)
          .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
        // const data = Object.fromEntries(values);
        let data = {};
        for (let i: number = 0; i < values.length; i++) {
            data[values[i][0]] = values[i][1];
        }
        UserController.updateProfile(data);
        
    }
    render() {
        return this.compile(profilePageTemplate, this.props);
    }
    
};

