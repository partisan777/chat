import loginPageTemplate from './loginForm_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';
import { Component } from '../../models/components/components';
import AuthController from '../../controllers/authController';
import { Link } from '../../models/link/link';
import { SignupData } from '../../api/AuthAPI';



interface LogFormPageProps {
  // pageTitle: string;
  // logHasAccButtonEvent: object;
  // loginButtonEvents: object;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
  com_isVisible?: boolean;
};

export class LoginFormPage extends Component {
  constructor(props: LogFormPageProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className = 'registration_form';
    super (props);
  };

  init() {
        this.children.login = new Input ({ 
            label: "login",
            labelVisible: "Логин",
            type: "text",
            name: "login",
            elem_id: "login-log",
            placeholder: "Введите логин",
            autocomplete: "on",
            checkType: "login",
            divErrorClassName: "reg-error",
            divErrorId: "log-error-login",
            divErrorCheckType: "login"
        });

        this.children.password = new Input ({ 
            label: "password",
            labelVisible: "Пароль",
            type: "password",
            name: "password",
            elem_id: "password-log",
            placeholder: "Введите пароль",
            autocomplete: "on",
            checkType: "password",
            divErrorClassName: "reg-error",
            divErrorId: "log-error-password",
            divErrorCheckType: "password"
        });

        this.children.loginButton = new Button ({
            labelVisible: "Вход",
            buttonClass: "button-button",
            type: "submit",
            elem_id:"login-button",
            events: {
                click: (e) => {
                  AuthController.logout();
                  e.preventDefault();
                  this.onSubmit()
                }
                
            }
            
        });
        
        this.children.link = new Link({
            label: 'Нет аккаунта',
            to: '/register',
          });
        }


    onSubmit() {
        const values = Object
          .values(this.children)
          .filter(child => child instanceof Input)
          .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
    
        const data = Object.fromEntries(values);
        AuthController.signin(data as SignupData);
      }

    render() {
        return this.compile(loginPageTemplate, {pageTitle: 'Войти'});
    }
    
};

