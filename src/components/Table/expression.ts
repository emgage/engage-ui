
const getPartExpression = function (object: string, data: any) {
  let partExpression = '';

  // Extract all '{variable}'
  const variables = object.match(/\{.*?\}/g);
  let obj = object;
  if (variables) {
    for (let i = 0; i < variables.length; i++) {
      const variable = variables[i].replace(/[{}]/g, '');
      // Not using check for undefined or null. That can be directly done by user in the expression
      // if i substitute undefined with '' then '' == 0  is evaluating to true.
      obj = object.replace(variables[i], '"' + data[variable] + '"'); // variable has to be quoted other wise the value will be say abcd and javascrit will expect a variable like that.
    }
    partExpression = obj;
  }

  return partExpression;
};

const getExpression = function (expressionStr: string, data: any) {
  let expression: string = ' ( ';
  expression += getPartExpression(expressionStr, data);
  expression += ' ) ';

  return expression;
};

const evaluate = function (expressionStr: string, data: any) {
  if (data) {
    // tslint:disable-next-line:no-eval
    if (eval(getExpression(expressionStr, data))) {
      return true;
    }
  }

  return false;
};

export const evalExpression = function (expression: string, data: any) {
  return evaluate(expression, data);
};

export const expressionConstant = function () {
  return {
    AND: '&&',
    OR: '||',
    EQ: '==',
    NEQ: '!=',
    GT: '>',
    GTE: '>=',
    LT: '<',
    LTE: '<='
  };
};
