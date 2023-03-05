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
	value?: string,
	errormessage?: string,
	events?: object
}    

export class Input extends Component {
	constructor(props: inputDataProps) {
		super('div', props);
		
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
	

	render() {
		return this.compile(inputTemplate, this.props);
	};
};




