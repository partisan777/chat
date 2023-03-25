import { Component } from "../../models/components/components";
import { Button } from "../../models/button/button";
import addFilesPageTemplate from "./addFilesPage_tmpl.hbs"


interface addFilesPageProps{
	pageTitle?: string,
	addFotoVideoEvents?: object,
	addFileEvents?: object,
	addLocationEvents?: object,
	com_className?: string,
    com_el_id?: string,
    com_tagName?: string,
	com_isVisible?: boolean,
	
}
	
export class AddFilesPage extends Component {
	constructor(props: addFilesPageProps ) {
		if (!props.com_tagName) props.com_tagName = 'div';
		if (!props.com_className) props.com_className = 'menu-add-files';
		if (!props.com_el_id) props.com_el_id = 'menu-add-files';
		if (!props.com_isVisible) props.com_isVisible = false;
		super(props)
	}
	init() {
		this.children.addfotovideo = new Button ({
			labelVisible: 'Фото Видео',
			buttonClass: "link-button",
			elem_id: "add-foto-video",
			events: this.props.addFotoVideoEvents.events,
			com_className: 'div', 
			
		});

		this.children.addfile = new Button ({
			labelVisible: 'Файл',
			buttonClass: "link-button",
			elem_id: "add-file",
			events: this.props.addFileEvents.events,
			com_className: 'div', 
		});
		
		this.children.addlocation = new Button ({
			labelVisible: 'Локация',
			buttonClass: "link-button",
			elem_id: "add-location",
			events: this.props.addLocationEvents.events,
			com_className: 'div',
		});
		
	}
	render() {
        return this.compile(addFilesPageTemplate, this.props);
    }
};


