import { Component } from '../../models/components/components';
import addFileTemplate from './addFile_tmpl.hbs';
import { Button } from '../../models/button/button';
import { Input } from '../../models/input/input';


interface AddFileFormPageProps {
  pageTitle: string;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
  com_isVisible?: boolean;
};

export class AddFileFormPage extends Component {
  constructor(props: AddFileFormPageProps) {
    props.com_tagName = 'div'
    props.com_className = "modal"
    props.com_el_id = "change-file-page" 
    if (!props.com_isVisible) props.com_isVisible = false;
    super(props)
  };
  init() {

    this.children.file = new Input ({
      label: "file",
      type: "image",
      name: "file",
      elem_id: "add-file-input",
      divErrorClassName: "reg-error",
      divErrorId: "reg-error-file-input"
    });

    this.children.addfile = new Button ({
      labelVisible: "Добавить",
      buttonClass:"button-button",
      type: "button",
      elem_id:"save-file-button"
    })
    
    this.children.closefile = new Button ({
      labelVisible: "Закрыть",
      buttonClass: "link-button",
      type: "button",
      elem_id: "close-add-file-button",
      events: {click: () => {this.hide()} }
    });
  } 
  
  render() {
      return this.compile(addFileTemplate, this.props);
  }
    
};

