// module.exports = {
//   parser: 'sugarss',
//   map: false,
//   from: '/path/to/src.sss',
//   to: '/path/to/dest.css',
//   plugins: {
//     'postcss-plugin': {}
//   }
// }

module.exports = {
  // parser: 'sugarss',
  plugins: {
    // 'postcss-import': {},
    // 'postcss-cssnext': {},
    'autoprefixer': {},
    'cssnano': {}
  }
}