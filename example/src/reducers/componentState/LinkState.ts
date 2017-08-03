export default {
  heading : 'Link Component',
  subheading : 'the link component is an elusive beast. You should only use it if you would like' +
                ' to go somewhere',
  example : [
    {
      name: 'url',
      type: 'string',
      desc: 'the url link to',
    }, {
      name: 'children',
      type: 'string',
      desc: 'the url link to',
    }, {
      name: 'children',
      type: 'string',
      desc: 'the url link to',
    },
  ],
  code : `
      const linkFunc = propy => {
        console.log('propy', propy);
        return propy + 'this is really a propy';
      };
      const prop = 'This is a prop';
      linkFunc(prop);
    `,
};
