export function isPermanentChar(maskOptions: any, pos: any) {
  return maskOptions.permanents.indexOf(pos) !== -1;
}
export function isAllowedChar(maskOptions: any, pos: any, character: any) {
  const { mask, charsRules } = maskOptions;
  if (!character) {
    return false;
  }
  if (isPermanentChar(maskOptions, pos)) {
    return mask[pos] === character;
  }
  const ruleChar = mask[pos];
  const charRule = charsRules[ruleChar];
  return (new RegExp(charRule)).test(character);
}
export function isEmpty(maskOptions: any, value: any) {
  return value
        .split('')
        .every((character: any, i: any) => {
          return isPermanentChar(maskOptions, i) || !isAllowedChar(maskOptions, i, character);
        });
}
export function getFilledLength(maskOptions: any, paramValue: any) {
  let value = paramValue;
  const { maskChar, prefix } = maskOptions;
  if (!maskChar) {
    while (value.length > prefix.length && isPermanentChar(maskOptions, value.length - 1)) {
      value = value.slice(0, value.length - 1);
    }
    return value.length;
  }
  let filledLength = prefix.length;
  for (let i = value.length; i >= prefix.length; i--) {
    const character = value[i];
    const isEnteredCharacter = !isPermanentChar(maskOptions, i) && isAllowedChar(maskOptions, i, character);
    if (isEnteredCharacter) {
      filledLength = i + 1;
      break;
    }
  }
  return filledLength;
}
export function isFilled(maskOptions: any, value: any) {
  return getFilledLength(maskOptions, value) === maskOptions.mask.length;
}
export function formatValue(maskOptions: any, paramValue: any) {
  const { maskChar, mask, prefix } = maskOptions;
  let value = paramValue;
  if (!maskChar) {
    value = insertString(maskOptions, '', value, 0);
    value = value.slice(0, getFilledLength(maskOptions, value));
    if (value.length < prefix.length) {
      value = prefix;
    }
    return value;
  }
  if (value) {
    const emptyValue: any = formatValue(maskOptions, '');
    return insertString(maskOptions, emptyValue, value, 0);
  }
  for (let i = 0; i < mask.length; i++) {
    if (isPermanentChar(maskOptions, i)) {
      value += mask[i];
    } else {
      value += maskChar;
    }
  }
  return value;
}
export function clearRange(maskOptions: any, paramValue: any, paramStart: any, len: any) {
  let value = paramValue;
  let start = paramStart;
  const end = start + len;
  const { maskChar, mask, prefix } = maskOptions;
  const arrayValue = value.split('');
  if (!maskChar) {
    start = Math.max(prefix.length, start);
    arrayValue.splice(start, end - start);
    value = arrayValue.join('');
    return formatValue(maskOptions, value);
  }
  return arrayValue
        .map((character: any, i: any) => {
          if (i < start || i >= end) {
            return character;
          }
          if (isPermanentChar(maskOptions, i)) {
            return mask[i];
          }
          return maskChar;
        })
        .join('');
}
export function insertString(maskOptions: any, paramValue: any, insertStr: any, paramInsertPos: any) {
  let value = paramValue;
  let insertPos = paramInsertPos;
  const { mask, maskChar, prefix } = maskOptions;
  const arrayInsertStr = insertStr.split('');
  const isInputFilled = isFilled(maskOptions, value);
  const isUsablePosition = (pos: any, character: any) => {
    return !isPermanentChar(maskOptions, pos) || character === mask[pos];
  };
  const isUsableCharacter = (character: any, pos: any) => {
    return !maskChar || !isPermanentChar(maskOptions, pos) || character !== maskChar;
  };
  if (!maskChar && insertPos > value.length) {
    value += mask.slice(value.length, insertPos);
  }
  arrayInsertStr.every((insertCharacter: any) => {
    while (!isUsablePosition(insertPos, insertCharacter)) {
      if (insertPos >= value.length) {
        value += mask[insertPos];
      }
      if (!isUsableCharacter(insertCharacter, insertPos)) {
        return true;
      }
      insertPos++;
      if (insertPos >= mask.length) {
        return false;
      }
    }
    const isAllowed = isAllowedChar(maskOptions, insertPos, insertCharacter) || insertCharacter === maskChar;
    if (!isAllowed) {
      return true;
    }
    if (insertPos < value.length) {
      if (maskChar || isInputFilled || insertPos < prefix.length) {
        value = value.slice(0, insertPos) + insertCharacter + value.slice(insertPos + 1);
      } else {
        value = value.slice(0, insertPos) + insertCharacter + value.slice(insertPos);
        value = formatValue(maskOptions, value);
      }
    } else if (!maskChar) {
      value += insertCharacter;
    }
    insertPos++;
    return insertPos < mask.length;
  });
  return value;
}
export function getInsertStringLength(maskOptions: any, value: any, insertStr: any, paramInsertPos: any) {
  let insertPos = paramInsertPos;
  const { mask, maskChar } = maskOptions;
  const arrayInsertStr = insertStr.split('');
  const initialInsertPos = insertPos;
  const isUsablePosition = (pos: any, character: any) => {
    return !isPermanentChar(maskOptions, pos) || character === mask[pos];
  };
  arrayInsertStr.every((insertCharacter: any) => {
    while (!isUsablePosition(insertPos, insertCharacter)) {
      insertPos++;
      if (insertPos >= mask.length) {
        return false;
      }
    }
    const isAllowed = isAllowedChar(maskOptions, insertPos, insertCharacter) || insertCharacter === maskChar;
    if (isAllowed) {
      insertPos++;
    }
    return insertPos < mask.length;
  });
  return insertPos - initialInsertPos;
}
