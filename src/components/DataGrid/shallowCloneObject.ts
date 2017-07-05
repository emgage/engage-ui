export default function shallowCloneObject(obj: any): any {
  let result = {} as any;
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      result[k] = obj[k];
    }
  }
  return result;
}
