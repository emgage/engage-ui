import { defaultCharsRules, defaultMaskChar } from './constant';
export default function (mask: any, paramMaskChar: any, paramCharsRules: any) {
  let maskChar = paramMaskChar;
  let charsRules = paramCharsRules;
  if (maskChar === undefined) {
    maskChar = defaultMaskChar;
  }
  if (charsRules == null) {
    charsRules = defaultCharsRules;
  }
  if (!mask || typeof mask !== 'string') {
    return {
      maskChar,
      charsRules,
      mask: '',
      prefix: '',
      lastEditablePos: undefined,
      permanents: [],
    };
  }
  let str = '';
  let prefix = '';
  const permanents: any = [];
  let isPermanent = false;
  let lastEditablePos;
  mask.split('')
        .forEach((character) => {
          if (!isPermanent && character === '\\') {
            isPermanent = true;
          } else {
            if (isPermanent || !charsRules[character]) {
              permanents.push(str.length);
              if (str.length === permanents.length - 1) {
                prefix += character;
              }
            } else {
              lastEditablePos = str.length + 1;
            }
            str += character;
            isPermanent = false;
          }
        });
  return {
    maskChar,
    charsRules,
    prefix,
    lastEditablePos,
    permanents,
    mask: str,
  };
}
