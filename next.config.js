const path = require('path');
const mdx = require('@next/mdx')({
  extension: /\.mdx?$/
});

module.exports = mdx({
  pageExtensions: [ 'js', 'ts', 'jsx', 'tsx', 'md', 'mdx' ],

  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles')
    ]
  },
});
