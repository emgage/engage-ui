import { Rect } from '@shopify/javascript-utilities/geometry';

export type PreferredPosition = 'above' | 'below' | 'left' | 'right' | 'mostSpace';
export type PreferredAlignment = 'left' | 'center' | 'right';

export interface Margins {
  activator: number;
  container: number;
  horizontal: number;
}

export function calculateVerticalPosition(
  activatorRect: Rect,
  overlayRect: Rect,
  overlayMargins: Margins,
  scrollableContainerRect: Rect,
  containerRect: Rect,
  preferredPosition: PreferredPosition,
  fixed: boolean | undefined
) {
  const activatorTop = activatorRect.top;
  const activatorBottom = activatorTop + activatorRect.height;

  const spaceAbove = activatorRect.top;
  const spaceBelow = containerRect.height - activatorRect.top - activatorRect.height;

  const desiredHeight = overlayRect.height;
  const verticalMargins = overlayMargins.activator + overlayMargins.container;
  const minimumSpaceToScroll = overlayMargins.container;

  const distanceToTopScroll = activatorRect.top - Math.max(scrollableContainerRect.top, 0);
  const distanceToBottomScroll = containerRect.top +
                                  Math.min(containerRect.height,
                                           scrollableContainerRect.top + scrollableContainerRect.height
    ) -
    (activatorRect.top + activatorRect.height);
  const enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll;
  const enoughSpaceFromBottomScroll = distanceToBottomScroll >= minimumSpaceToScroll;
  const heightIfBelow = Math.min(spaceBelow, desiredHeight);
  const heightIfAbove = Math.min(spaceAbove, desiredHeight);
  const containerRectTop = fixed ? 0 : containerRect.top;
  const positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: 'above',
  };

  const positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: 'below',
  };
  const positionIfLeftOrRight = {
    height: overlayRect.height,
    top: positionIfBelow.top - activatorRect.height - ((overlayRect.height - activatorRect.height) / 2),
    positioning: 'below',
  };
  if (preferredPosition === 'above') return positionIfAbove;

  if (preferredPosition === 'below') return positionIfBelow;

  if (preferredPosition === 'right' || preferredPosition === 'left') {
    return positionIfLeftOrRight;
  }

  if (enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll) {
    return spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow;
  }

  return distanceToTopScroll > minimumSpaceToScroll
    ? positionIfAbove
    : positionIfBelow;
}

export function calculateHorizontalPosition(
  activatorRect: Rect,
  overlayRect: Rect,
  containerRect: Rect,
  overlayMargins: Margins,
  preferredAlignment: PreferredAlignment,
  preferredPosition: PreferredPosition,
  preloadedPopover: boolean
) {
  const maximum = containerRect.width - overlayRect.width;

  if (preferredAlignment === 'left') {

    return Math.min(
      maximum,
      Math.max(0, activatorRect.left - overlayMargins.horizontal)
    );
  } if (preferredAlignment === 'right') {

    return Math.min(
      maximum,
      Math.max(
        0,
        activatorRect.left - ((activatorRect.width - overlayRect.width))
      )
    );
  } if (preferredAlignment === 'center' && (preferredPosition === 'above' || preferredPosition === 'below') && !preloadedPopover) {

    return Math.min(
      maximum,
      Math.max(
        0,
        activatorRect.left - ((activatorRect.width - overlayRect.width) / 2)
      )
    );
  } if (preferredPosition === 'left' || preferredPosition === 'right') {
    return Math.min(
      maximum,
      Math.max(0, preferredPosition === 'right' ? (activatorRect.center.x + activatorRect.width / 2) : (activatorRect.center.x - (activatorRect.width) - (activatorRect.width / 2)))
    );
  }

  return Math.min(
    maximum,
    Math.max(0, activatorRect.center.x - overlayRect.width / 2)
  );
}

export function rectIsOutsideOfRect(inner: Rect, outer: Rect) {
  const { center } = inner;

  return center.y < outer.top || center.y > outer.top + outer.height;
}
