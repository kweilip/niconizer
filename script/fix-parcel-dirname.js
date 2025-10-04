const fs = require('fs')
const path = require('path')

const distAppIndexPath = path.join(__dirname, '..', 'dist', 'app', 'index.js')

let content = fs.readFileSync(distAppIndexPath, 'utf8')

// Fix Parcel's incorrect __dirname injection
// Replace: var $xxx$var$$parcel$__dirname=$3JrO4$path.resolve(__dirname,"../../src/app");
// With:    var $xxx$var$$parcel$__dirname=__dirname;
const fixed = content.replace(
  /var (\$[a-zA-Z0-9]+\$var\$\$parcel\$__dirname)=\$3JrO4\$path\.resolve\(__dirname,"\.\.\/\.\.\/src\/app"\);/g,
  'var $1=__dirname;'
)

if (content === fixed) {
  console.warn('Warning: Parcel __dirname pattern not found. Build may have changed.')
} else {
  fs.writeFileSync(distAppIndexPath, fixed, 'utf8')
  console.log('✓ Fixed Parcel __dirname bug in dist/app/index.js')
}
