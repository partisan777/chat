import { Component } from "../components/components";
import buttonTemplate from "./button_tmpl.hbs";

interface buttonDataProps  {
	labelVisible?: string,
	actionFunction?: Function,
	buttonClass?: string,
    type?: string,
    elem_id?: string,
	events?: {},
	com_className?: string,
	com_el_id?: string,
	com_tagName?: string,
	com_isVisible?: boolean,
};    

export class Button extends Component {
	constructor(props: buttonDataProps) {
		if (!props.com_tagName) props.com_tagName = 'div';
		super(props);
	}
	render() {
		return this.compile(buttonTemplate, this.props);
	}
};

