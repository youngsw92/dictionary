const utilities = require('./utilities');

const SAMPLE_DICTIONARY_FILENAME = 'sample_dictionary.txt';

let numberArg = process.argv[2];
if (numberArg !== undefined) {
    // remove any hyphens in number argument
    numberArg = numberArg.replace(/-/g, '');
    utilities.processSampleDictionary(SAMPLE_DICTIONARY_FILENAME)
        .then((numbsToWordListMap) => {
            // if number argument exists in the sample file
            // print all valid strings one by one in the console
            if (numberArg in numbsToWordListMap) {
                for (let word of numbsToWordListMap[numberArg]) {
                    console.log(word);
                }
            }
        });
}
