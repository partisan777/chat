import { Component } from "../components/components";
import { Message } from "../message/message";
import chatItemTemplate from "./chatItem_tmpl.hbs";
import { dateFormat } from "../../utils/dateFormat"
import { ChatInfo } from '../../api/interfaces';
/*
export interface chatItemProps {
    id?: number;
    title?: string;
    unread_count?: number;
    last_message?: 
    {
      user?: {
        first_name?: string;
        second_name?: string;
        avatar?: string;
        email?: string;
        login?: string;
        phone?: string;
      }
    
    time?: Date | string;
    content?: string;
    };
	  events?: {};
    com_className?: string;
    com_el_id?: string;
    com_tagName?: string;
    com_isVisible?: boolean;
};
*/
interface chatItemProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  };
  com_tagName?: string;
  com_className?: string;
  com_el_id?: string;
  last_message?: 
    {
      user?: {
        first_name?: string;
        second_name?: string;
        avatar?: string;
        email?: string;
        login?: string;
        phone?: string;
      }
      time?: Date;
      time_str?: string;
      content?: string;
 }}
export class ChatItem extends Component {
    constructor(props: chatItemProps) {
      if (!props.com_tagName) props.com_tagName = 'div';
      if (!props.com_className) props.com_className = "chat-item";
      super(props);
    }
    
  render() {
    if (this.props.last_message?.time) { this.props.last_message.time_str = dateFormat(new Date(this.props.last_message.time))  }; 
    return this.compile(chatItemTemplate, this.props);
	}

};

