export default function createObjectWithProperties(originalObj: any, properties: any): any {
  let result = {} as any;
  for (let property of properties) {
    if (originalObj[property]) {
      result[property] = originalObj[property];
    }
  }
  return result;
}
