import { ReactComponent } from '@shopify/react-utilities';
import * as React from 'react';

const { isValidElement } = React;

/// Wraps `element` in `Component`, if it is not already an instance of
/// `Component`. If `props` is passed, those will be added as props on the
/// wrapped component. If `element` is null, the component is not wrapped.
export function wrapWithComponent<P>(
  element: React.ReactNode | null | undefined,
  Component: ReactComponent<P>,
  props?: any,
): React.ReactNode {
  if (element == null) { return null; }
  return isElementOfType(element, Component)
    ? element as React.ReactElement<P>
    : <Component {...props}>{element}</Component>;
}

/// In development, we compare based on the name of the function because
/// React Hot Loader proxies React components in order to make updates. In
/// production we can simply compare the components for equality.
const isComponent = (AComponent: ReactComponent<any>, AnotherComponent: ReactComponent<any>): boolean => {
  if (AComponent.displayName && AnotherComponent.displayName) {
    const isAComponentThemed = AComponent.displayName.indexOf('Themed') === 0;
    const isAnotherComponentThemed = AnotherComponent.displayName.indexOf('Themed') === 0;

    if ((isAComponentThemed && !isAnotherComponentThemed) ||
        (!isAComponentThemed && isAnotherComponentThemed)) {
          return false;
        }

    return AComponent.displayName === AnotherComponent.displayName;
  }

  return AComponent === AnotherComponent;
};

/// Checks whether `element` is a React element of type `Component` (or one of
/// the passed components, if `Component` is an array of React components).
export function isElementOfType(
  element: React.ReactNode | null | undefined,
  Component: ReactComponent<{}> | ReactComponent<{}>[],
): boolean {
  if (element == null || !isValidElement(element) || typeof element.type === 'string') {
    return false;
  }

  const {type} = element;
  const Components = Array.isArray(Component) ? Component : [Component];

  return Components.some((AComponent) => typeof type !== 'string' && isComponent(AComponent, type));
}