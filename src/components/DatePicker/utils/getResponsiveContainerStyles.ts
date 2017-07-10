import Constants from '../Component/constants';


export default function getResponsiveContainerStyles(
  anchorDirection: any,
  currentOffset: any,
  containerEdge: any,
  margin: any,
) {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const calculatedOffset = anchorDirection === Constants.ANCHOR_LEFT
    ? windowWidth - containerEdge
    : containerEdge;
  const calculatedMargin = margin || 0;

  return {
    [anchorDirection]: Math.min(currentOffset + calculatedOffset - calculatedMargin, 0),
  };
}
