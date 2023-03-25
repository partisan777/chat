import regPageTemplate from './regForm_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';
import { Component } from '../../models/components/components';
// import submitRegForm from '../../utils/formValidate'
import {checkValueInput} from "../../utils/formValidate"
import AuthController from '../../controllers/authController';
import { Link } from '../../models/link/link';
import { SignupData } from '../../api/AuthAPI';

interface RegFormPageProps {
  pageTitle?: string,
  regHasAccButtonEvents?: object,
  registrationButtonEvents?: object,
  com_className?: string,
  com_el_id?: string,
  com_tagName?: string,
  com_isVisible?: boolean
};

// const props = { 
//     pageTitle: 'Регистрация',
//     events: {
//     submit: (e: Event) => {
//             e.preventDefault();
//         }
//     }   
// }

export class RegFormPage extends Component {
  constructor(props: RegFormPageProps) {
    if (!props.com_tagName) props.com_tagName = 'form';
    if (!props.com_className) props.com_className = 'registration_form';
    if (!props.com_isVisible) props.com_isVisible = false;
    super(props)
  };

  init() {
        this.children.email = new Input ({
            label: "email",
            labelVisible: "Почта",
            type: "text",
            name: "email",
            elem_id: "email",
            placeholder: "Введите адрес электронной почты",
            autocomplete:"on",
            checkType: "email",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-email",
            divErrorCheckType: "email",
            errormessage: '',
            events: {
                    blur: (e: Event) => { 
                        const {name, currentError, currentValue} = checkValueInput(e);
                        console.log(name, currentError, currentValue);
                        this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
                    }
                }   
        });
    
        this.children.login = new Input ({ 
            label: "login",
            labelVisible: "Логин",
            type: "text",
            name: "login",
            elem_id: "reg_login",
            placeholder: "Введите логин",
            autocomplete: "on",
            checkType: "login",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-login",
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
            label: "first_name",
            labelVisible: "Имя",
            type: "text",
            name: "first_name",
            elem_id: "first_name",
            placeholder: "Введите имя",
            autocomplete: "on",
            checkType: "first_name",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-name",
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
            label: "second_name",
            labelVisible: "Фамилия",
            type: "text",
            name: "second_name",
            elem_id: "secondName",
            placeholder: "Введите фамилию",
            autocomplete: "on",
            checkType: "secondName",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-lastname",
            divErrorCheckType: "secondName",
            events: {
                blur: (e: Event) => { 
                    const {name, currentError, currentValue} = checkValueInput(e);
                    console.log(name, currentError, currentValue);
                    this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
                }
            }   
        });

        this.children.display_name = new Input ({
            label: "display_name",
            labelVisible: "Отображаемое имя",
            type: "text",
            name: "display_name",
            elem_id: "display_name",
            placeholder: "Отображаемое имя",
            autocomplete: "on",
            checkType: "display_name",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-displayname",
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
            label: "phone",
            labelVisible: "Телефон",
            type: "tel",
            name: "phone",
            elem_id: "phone",
            placeholder: "Введите номер телефона", 
            autocomplete: "on",
            checkType: "phone",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-phone",
            divErrorCheckType: "phone",
            events: {
                blur: (e: Event) => { 
                    const {name, currentError, currentValue} = checkValueInput(e);
                    console.log(name, currentError, currentValue);
                    this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
                }
            }   
        });
            
        this.children.password = new Input ({ 
            label: "password",
            labelVisible: "Пароль",
            type: "password",
            name: "password",
            elem_id: "password",
            placeholder: "Введите пароль",
            autocomplete: "on",
            checkType: "password",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-password",
            divErrorCheckType: "password",
            events: {
                blur: (e: Event) => { 
                    const {name, currentError, currentValue} = checkValueInput(e);
                    console.log(name, currentError, currentValue);
                    this.children[name].setProps({'errormessage': currentError, 'value': currentValue})
                }
            }   
        }); 
            
        this.children.password_confirm = new Input ({ 
            label: "password_confirm",
            labelVisible: "Повторите пароль",
            type: "password",
            name: "password_confirm",
            elem_id: "password-confirm",
            placeholder: "Введите повтор пароля",
            autocomplete: "on",
            checkType: "password_confirm",
            divErrorClassName: "reg-error",
            divErrorId: "reg-error-password-confirm",
            divErrorCheckType: "password_confirm",
            events: {
                blur: (e: Event) => { 
                    console.log(this.children.password)
                }
            }   
        });

        this.children.registrationButton = new Button ( {
            labelVisible: "Зарегистрироваться",
            buttonClass: "button-button",
            type: "submit",
            elem_id: "registration-button",
            events: {
                click: (e) => {
                    e.preventDefault();
                    this.onSubmit();
                    
                }
                
            }
        });
        
        this.children.link = new Link({
            label: 'Войти',
            to: '/'
          });

    }
    onSubmit() {
        const values = Object
          .values(this.children)
          .filter(child => child instanceof Input)
          .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
        const data = Object.fromEntries(values);
        AuthController.signup(data as SignupData);
    }
    
    render() {
        return this.compile(regPageTemplate, this.props);
    }
    
};


