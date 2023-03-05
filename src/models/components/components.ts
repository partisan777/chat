import {EventBus} from "./eventBus";
import { nanoid } from "nanoid";

enum EVENTS {
	INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
	windowOpen = "window:open",
	windowClose = "window:close",
	buttonClick = "click",
	click = "click",
	changeInput = "change",
  blurInput = "blur",
  focusInput = "focus",
  submitForm = "submit",
	onBlurInput = "onblur",
	mouseleave = "mouseleave"
};



export class Component<P extends Record<string, any> = any> {

	public static readonly EVENTS = EVENTS;
	public id = nanoid(6);
	protected props: P;
	public children: Record<string, Component>;
	protected eventBus: () => EventBus;
	protected _element: HTMLElement | null = null;
	private _meta: { tagName: string; props: P; className: string, el_id: string};
  private _el: HTMLElement | null = null;
  protected isVisible: boolean; 
 
 
  constructor(tagName = "div", propsWithChildren: P, className = '', el_id = '', isVisible = true ) {
    const eventBus = new EventBus();
    this.isVisible = isVisible;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
		  tagName,
    	props: props as P,
      className,
      el_id
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    
    this._registerEvents(eventBus);
    this.eventBus().emit(Component.EVENTS.INIT);
    
  }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Component>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, Component> = {};

   Object.entries(childrenAndProps).forEach(([key, value]) => {
     

      if (value instanceof Component) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  _addEvents(): void {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents(): void {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };
    
    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus): void {
    this.eventBus().on(Component.EVENTS.INIT, this._init.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus().on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    const { tagName, className, el_id } = this._meta;
    this._element = this._createDocumentElement(tagName, className, el_id);
  }

  private _init(): void {
    this._createResources();
    this.init();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  protected init(): void {}
  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  protected componentDidUpdate(oldProps: P, newProps: P): boolean {
    return true;
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  get element() {
    return this._element;
  }

  private _render(): void {
    const fragment = this.render();
    this._removeEvents();
    this._element!.innerHTML = '';
    this._element!.append(fragment);
    this._addEvents();
  }


  protected compile(template: (context: any) => string, context: any): DocumentFragment {
    const contextAndStubs = {...context};

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(item => `<div data-id="${item.id}"></div>`)
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Component) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }
      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent()!);
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });
    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    } 

    Object.assign(this.props, nextProps);
  };

  _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target }

        target[prop as keyof P] = value;

        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string, className: string, el_id: string) {
    this._el = document.createElement(tagName); 
    if (className != '') {
      this._el.className = className
    }
    if (el_id != '') {
      this._el.setAttribute('id', el_id);
    }
    
    return this._el
  }

  show(): void {
    this.isVisible = true;
    this.getContent()!.style.display = "flex";
  }

  hide(): void {
    this.isVisible = false;
    this.getContent()!.style.display = "none";
  }

  changeVisible(): void {
    if (!this.isVisible) {
      this.show()
    } else {
      this.hide()
    }
  }
}


