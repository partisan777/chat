import { Component } from '../components/components';
import { PropsWithRouter, withRouter } from '../../utils/withRouter';
import link_tmpl from './link_tmpl.hbs';


interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  com_className?: string;
  com_el_id?: string;
  com_tagName?: string;
  com_isVisible?: boolean;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Component<LinkProps> {
  constructor(props: LinkProps) {
    if (!props.com_tagName) props.com_tagName = 'div';
    if (!props.com_className) props.com_className = "link";
    super({
      ...props,
      events: {
        click: () => this.navigate()
      },
    });
    
  }

  navigate() {
    this.props.router.go(this.props.to);
  };
  
  render() {
    return this.compile(link_tmpl, { ...this.props});
  };
}


export const Link = withRouter(BaseLink);



