import { ANCHOR_LEFT } from '../Constants';

export default function getResponsiveContainerStyles(
  anchorDirection,
  currentOffset,
  containerEdge,
  margin,
) {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const calculatedOffset = anchorDirection === ANCHOR_LEFT
    ? windowWidth - containerEdge
    : containerEdge;
  const calculatedMargin = margin || 0;

  return {
    [anchorDirection]: Math.min(currentOffset + calculatedOffset - calculatedMargin, 0),
  };
}
