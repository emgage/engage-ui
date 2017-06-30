const {basename} = require('path');

const ICON_REGEX = /icons\/.*\.svg$/;

module.exports = {
  process(src, filename) {
    console.log('svg crap src: ' + src);
    console.log('svg crap filename: ' + src);
    const content = ICON_REGEX.test(filename)
      ? {body: '<path />', viewBox: '0 0 20 20'}
      : basename(filename);
      
    console.log('svg crap content: ' + content);

    return `module.exports = ${JSON.stringify(content)};`;
  },
};
