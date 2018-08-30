const ke = require('keyword-extractor')

// https://www.npmjs.com/package/keyword-extractor

function keywordExtractor (string) {
  const testString = 'This is my lunchtime string that I am writing at lunchtime on Thursday'
  // returns [ 'lunchtime', 'string', 'writing', 'thursday' ]

  const config = {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  }
  const extraction = ke.extract(string, config)
  
  console.log(extraction)
  return extraction
}

module.exports = keywordExtractor
