export default function getTransformStyles(transformValue:any) {
  return {
    transform: transformValue,
    msTransform: transformValue,
    MozTransform: transformValue,
    WebkitTransform: transformValue,
  };
}
