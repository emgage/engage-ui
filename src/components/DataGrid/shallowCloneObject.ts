export default function shallowCloneObject(obj: any): any {
  const result = {} as any;
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      result[k] = obj[k];
    }
  }
  return result;
}
