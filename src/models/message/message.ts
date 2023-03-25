import { Component } from "../components/components";
import messageTemplate_tmpl from "./message_tmpl.hbs";    
import { dateFormat } from "../../utils/dateFormat";

interface messageDataProps {
    messageId?: string;
    chatId?: string;
    senderId?: string;
    senderName?: string;
    time?: Date;
    sendMessageDate_str?: string;
    textContent?: string;
    isMine?: boolean;
    com_tagName?: string;
	com_className?: string;
    directToMe?: string;
}


export class Message extends Component {
	constructor(props: messageDataProps) {
        if (!props.com_tagName) props.com_tagName = 'div';
        if (!props.com_className) props.com_className = "message-wrap";
        if (props.isMine) { props.directToMe = 'me'  
        } else {
            props.directToMe = 'from'
        }
        if (props.time) props.sendMessageDate_str = dateFormat(new Date(props.time));
        super(props);
            
     }

    render() {
        return this.compile(messageTemplate_tmpl, this.props);
	}
};



