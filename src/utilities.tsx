import * as React from 'react';

export type ReactComponent<P> = React.StatelessComponent<P> | React.ComponentClass<P>;

const { isValidElement } = React;

export const firstChild = () => (props: {children?: React.ReactNode}) => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

export const getDisplayName = () => (COMPONENT: ReactComponent<any>) => {
  return COMPONENT.displayName || (COMPONENT as React.StatelessComponent<any>).name || 'COMPONENT';
};

/// Wraps `element` in `Component`, if it is not already an instance of
/// `Component`. If `props` is passed, those will be added as props on the
/// wrapped component. If `element` is null, the component is not wrapped.
export function wrapWithComponent<P>(
  element: React.ReactNode | null | undefined,
  COMPONENT: ReactComponent<P>,
  props?: any
): React.ReactNode {
  if (element == null) { return null; }
  return isElementOfType(element, COMPONENT)
    ? element as React.ReactElement<P>
    : <COMPONENT {...props}>{element}</COMPONENT>;
}

/// In development, we compare based on the name of the function because
/// React Hot Loader proxies React components in order to make updates. In
/// production we can simply compare the components for equality.
const isComponent = (aComponent: ReactComponent<any>, anotherComponent: ReactComponent<any>): boolean => {
  if (aComponent.displayName && anotherComponent.displayName) {
    const isAComponentThemed = aComponent.displayName.indexOf('Themed') === 0;
    const isAnotherComponentThemed = anotherComponent.displayName.indexOf('Themed') === 0;

    if ((isAComponentThemed && !isAnotherComponentThemed) ||
        (!isAComponentThemed && isAnotherComponentThemed)) {
      return false;
    }

    return aComponent.displayName === anotherComponent.displayName;
  }

  return aComponent === anotherComponent;
};

/// Checks whether `element` is a React element of type `Component` (or one of
/// the passed components, if `Component` is an array of React components).
export function isElementOfType(
  element: React.ReactNode | null | undefined,
  component: ReactComponent<{}> | ReactComponent<{}>[]
): boolean {
  if (element == null || !isValidElement(element) || typeof element.type === 'string') {
    return false;
  }

  const { type } = element;
  const components = Array.isArray(component) ? component : [component];

  return components.some(aComponent => typeof type !== 'string' && isComponent(aComponent, type));
}

// Function to calculate position of tooltip or popover
export function calculateTipPosition(activatorRectXAxisCenter: number, left: number, preferredPosition?: any, preferredAlignment?: any, overlayRect?:any, isPopover?:any) {
  if (preferredAlignment === 'right' && preferredPosition === 'below') {
    return { marginLeft: activatorRectXAxisCenter, marginTop: '-4px' };
  }
  if (preferredAlignment === 'center' && isPopover && (preferredPosition === 'below' || preferredPosition === 'above')) {
    return { marginLeft: overlayRect / 2, marginTop: '-4px' };
  }
  if (preferredAlignment === 'center' &&   (preferredPosition === 'below' || preferredPosition === 'above')) {
    return { marginLeft: activatorRectXAxisCenter - left - 16, marginTop: '-4px' };
  }
  if (preferredAlignment === 'left' && preferredPosition === 'below') {
    return { marginLeft: 16, marginTop: '-4px' };
  }
  if (preferredAlignment === 'left' && preferredPosition === 'above') {
    return { marginLeft: 10 };
  }
  if (preferredPosition === 'above') {
    return { marginLeft: activatorRectXAxisCenter };
  }
  if (preferredPosition === 'below' || preferredPosition === 'mostSpace') {
    return { marginLeft: activatorRectXAxisCenter, marginTop: '-4px' };
  }
  if (preferredPosition === 'belowLeft') {
    return { marginLeft: activatorRectXAxisCenter, marginTop: '-4px' };
  }
  if (preferredPosition === 'belowRight') {
    return { left: activatorRectXAxisCenter - left, marginTop: '-4px' };
  }
  if (preferredPosition === 'right') {
    return { top: '34%' };
  }
  if (preferredPosition === 'left') {
    return { top: '34%', right: '4%' };
  }
}
