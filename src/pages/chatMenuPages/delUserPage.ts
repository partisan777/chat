import { Component } from '../../models/components/components';
import delUserPageTemplate from './delUserPage_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';


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
      type: "image",
      name: "user",
      elem_id: "del-user-input",
      divErrorClassName: "reg-error",
      divErrorId: "reg-error-del-user-input"
    });

    this.children.deluserbutton = new Button ({
      labelVisible: "Удалить",
      buttonClass:"button-button",
      type: "button",
      elem_id:"del-user-button"
    })
    
    this.children.closedeluser = new Button ({
      labelVisible: "Закрыть",
      buttonClass: "link-button",
      type: "button",
      elem_id: "close-del-user-button",
      events: {click: () => {this.hide()} }
    });    
  } 
  
  render() {
      return this.compile(delUserPageTemplate, this.props);
  }
    
};

