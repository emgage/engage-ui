import { Rect } from '@shopify/javascript-utilities/geometry';

export type PreferredPosition = 'above' | 'below' | 'belowRight' | 'belowLeft' | 'left' | 'right' | 'mostSpace';
export type PreferredAlignment = 'left' | 'center' | 'right';

export interface Margins {
  activator: number;
  container: number;
  horizontal: number;
}

// Function used to calculate vertical position of overlay
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

  // Calculate dimentions of overlay when overlay needs to be displayed on top / above of dropdown
  const positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: 'above',
  };

  // Calculate dimentions of overlay when overlay needs to be displayed on bottom / below of dropdown
  const positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: 'below',
  };

  // Calculate dimentions of overlay when overlay needs to be displayed on left / right side of dropdown
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

// Function used to calculate horizontal position of overlay
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
  // Define when overlay needs to be displayed left aligned with dropdown's left side
  if (preferredAlignment === 'left') {
    return 0;

  // Define when overlay needs to be displayed left aligned with dropdown's left side
  } if (preferredAlignment === 'right') {
    return -(overlayRect.width - activatorRect.width - 16);
  }
  // Define when overlay needs to be displayed center aligned with dropdown node
  if (preferredAlignment === 'center') {
    return -(overlayRect.width - activatorRect.width -  16) / 2  ;

      // Define when overlay needs to be displayed center aligned with dropdown node
  }
  if (preferredAlignment === 'center' && (preferredPosition === 'above' || preferredPosition === 'below') && !preloadedPopover) {
    return Math.min(
      maximum,
      Math.max(
        0,
        activatorRect.left - ((activatorRect.width - overlayRect.width) / 2)
      )
    );
  // Define when overlay needs to be displayed left or right side of dropdown  
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
