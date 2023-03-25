import { Component } from "../../models/components/components";
import { Button } from "../../models/button/button";
import ChatMenuPageTemplate from "./chatMenuPage_tmpl.hbs"





interface chatMenuPageProps{
	pageTitle?: string;
	addUserFormPageEvents?: object;
	delUserFormPageEvents?: object;
	com_className?: string;
    com_el_id?: string;
    com_tagName?: string;
	com_isVisible?: boolean;
}

export class ChatMenuPage extends Component {
	constructor(props: chatMenuPageProps) {
		if (!props.com_tagName) props.com_tagName = 'div';
		if (!props.com_className) props.com_className = 'chat-menu-list';
		if (!props.com_el_id) props.com_el_id = 'chat-menu-list';
		if (!props.com_isVisible) props.com_isVisible = false;
		super(props)
	}
	init() {
		
		this.children.adduser = new Button({
			labelVisible: "Добавить пользователя",
			buttonClass: "link-button",
			elem_id: "add-user",
			events: this.props.addUserFormPageEvents.events
		});
	
		this.children.deluser = new Button({
			labelVisible: "Удалить пользователя",
			buttonClass: "link-button",
			elem_id: "delete-user",
			events: this.props.delUserFormPageEvents.events
		});
		
	}
	render() {
        return this.compile(ChatMenuPageTemplate, this.props);
    }
};


