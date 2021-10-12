const fs = require('fs');
const readline = require('readline');

// mapping from letter to number
const LETTER_TO_NUMBER_MAP = {
    'a': 2,
    'b': 2,
    'c': 2,
    'd': 3,
    'e': 3,
    'f': 3,
    'g': 4,
    'h': 4,
    'i': 4,
    'j': 5,
    'k': 5,
    'l': 5,
    'm': 6,
    'n': 6,
    'o': 6,
    'p': 7,
    'q': 7,
    'r': 7,
    's': 7,
    't': 8,
    'u': 8,
    'v': 8,
    'w': 9,
    'x': 9,
    'y': 9,
    'z': 9
};

// convert given word to matching number
const convertWordToNumber = function (word) {
    let res = "";

    if (word !== undefined) {
        for (let char of word) {
            if (char in LETTER_TO_NUMBER_MAP) {
                res += LETTER_TO_NUMBER_MAP[char];
            }
        }
    } else {
        console.error("Invalid argument:", word);
    }

    return res;
}

// process given dictionary file and return the object that maps number to words
const processSampleDictionary = async function (fileName) {
    const fileStream = fs.createReadStream(fileName);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let numbsToWordListMap = {};
    let lineCount = 0;
    for await (const line of rl) {
        lineCount++;
        if (line !== undefined && line.trim()) {
            const trimmedLine = line.trim();
            const numbers = convertWordToNumber(trimmedLine);

            if (numbers.trim()) {
                if (numbsToWordListMap[numbers] === undefined) {
                    numbsToWordListMap[numbers] = []
                }

                numbsToWordListMap[numbers].push(trimmedLine)
            }
        }
    }

    return numbsToWordListMap;
}

exports.processSampleDictionary = processSampleDictionary;
