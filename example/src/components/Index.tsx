import * as React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import ChoiceListPage from './ChoiceListPage';
import PanelPage from './PanelPage';

const ComponentLink = (props: any) => {
  return (
    <li>
      <Link to={props.item.to}>
        {props.item.name}
      </Link>
    </li>
  );
};

class Components extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      navItems: [
        {
          name: 'Choice List',
          to: '/components/choicelist',
          component: ChoiceListPage,
        },
        {
          name: 'Panel',
          to: '/components/panel',
          component: PanelPage,
        },
      ],
    };
  }
  render() {
    return (
        <div>
          <div>
            <div>
              <h5>Components</h5>
              <ul>
                {this.state.navItems.map((item: any, i: number) => {
                  return <ComponentLink key={i} item={item} />;
                })}
              </ul>
            </div>
          </div>
          <div>
            {this.props.children}
          </div>
          {this.state.navItems.map((item: any, i: number) => {
            return <Route key={i} path={item.to} component={item.component} />;
          })}

          <Redirect to="/components/choicelist" />
        </div>
    );
  }
}

export default Components;
