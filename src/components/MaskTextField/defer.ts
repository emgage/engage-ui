export default function (fn: any) {
  const defer = window.requestAnimationFrame || window.webkitRequestAnimationFrame || (() => setTimeout(fn, 0));
  return defer(fn);
}
