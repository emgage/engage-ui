import { IDocument } from '../../Types';

const listState: IDocument = {
  heading : 'List Component',
  subheading : 'this component does lots of really cool things with lists. You should use it.',
  property : [
    {
      name: 'heading',
      type: 'string',
      desc: 'the heading for the list',
    }, {
      name: 'children',
      type: 'string or React Node',
      desc: 'the content to display inside list',
    },
  ],
  code : `
      const listFunc = propy => {
        console.log('propy', propy);
        return propy + 'this is really a propy';
      };
      const prop = 'This is a prop';
      listFunc(prop);
    `,
};

export default listState;
