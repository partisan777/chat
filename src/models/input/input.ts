import { Component } from "../components/components";
import inputTemplate from "./input_tmpl.hbs";


interface inputDataProps {
    label?: string,
    labelVisible?: string,
	type?: string,
	name?: string,
	elem_id?: string,
	placeholder?: string,
	autocomplete?: string,
	checkType?: string,
    divErrorClassName?: string,
    divErrorId?: string,
	divErrorCheckType?: string,
	eventActions?: Function,
	class?: string,
	// value?: string,
	errormessage?: string,
	events?: object,
	com_className?: string,
    com_el_id?: string,
    com_tagName?: string,
	com_isVisible?: boolean,
}    

export class Input extends Component {
	constructor(props: inputDataProps) {
		if (!props.com_tagName) props.com_tagName = 'div';
		super(props);
		
	}
	_addEvents(): void {
		const {events = {}} = this.props as P & { events: Record<string, () => void> };

		Object.keys(events).forEach(eventName => {
				this._element?.querySelector('input')?.addEventListener(eventName, events[eventName]);
		});
	}
	_removeEvents(): void {
		const {events = {}} = this.props as P & { events: Record<string, () => void> };
	
		Object.keys(events).forEach(eventName => {
		  this._element?.querySelector('input')?.removeEventListener(eventName, events[eventName]);
		});
	}

	setValue(value: string) {
		// return (this.element as HTMLInputElement).value = value;

		return (this.element.querySelector('input') as HTMLInputElement).value = value;
	}

	getName() {
		return (this.element?.querySelector('input') as HTMLInputElement).name;
	}
	
	getValue() {
		return (this.element?.querySelector('input') as HTMLInputElement).value;
	}
	

	render() {
		return this.compile(inputTemplate, this.props);
	};
};




