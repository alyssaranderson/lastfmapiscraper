const jsonToCsv = require('json-to-csv-stream')
const fs = require('fs')
 
fs.createReadStream('./output.txt')
  .pipe(jsonToCsv())
  .pipe(fs.createWriteStream('./output.csv'))
