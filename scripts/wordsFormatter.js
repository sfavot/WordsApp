const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const uniq = require('lodash/uniq');
const difference = require('lodash/difference');
const transliteration = require('transliteration');

const alphabet = require('../lang_data/alphabet.json');
const CONFIG_DIR = '../lang_data/';

const processFile = (language, filename, maxLength) => {
  const mainDir = path.join(__dirname, CONFIG_DIR, language, '/');
  const data = { words: [] };
  console.log('Processing ' + filename + ' for language ' + language + '.');

  const filePath = path.join(mainDir, 'raw/', filename);
  const lineReader = readLine.createInterface({
    input: fs.createReadStream(filePath)
  });

  lineReader.on('line', (line) => {
    if (line && line !== '') {
      // Ignore words longer than max length or smaller than 3
      if (line.length > maxLength || line.length < 3) {
        return;
      }

      // Ignore words with duplicated letters
      if (uniq(line).length < line.length) {
        return;
      }

      // Ignore words containing non alphabetical characters
      if (difference(line.split(''), alphabet.letters).length > 0) {
        return;
      }

      // Format words
      line = transliteration.transliterate(line)
      line = line.toLowerCase();

      letters = uniq(line.split(''));
      letters.forEach(letter => {
        if (!data[letter]) {
          data[letter] = [];
        }
        data[letter].push(line);
      });
      data.words.push(line);
    }
  });

  lineReader.on('close', () => {
    // Dedupe
    Object.keys(data).forEach(key => {
      data[key] = uniq(data[key]);
    });

    // Create file
    const output = path.join(mainDir, '/data.json');
    const json = JSON.stringify(data);
    fs.writeFile(output, json, 'utf8', (err) => {
      if (err) throw err;
      console.log(data.words.length + ' words registered.');
    });
    const files = Object.keys(data);
  });
};

const language = process.argv[2];
const filename = process.argv[3];
const maxLength = process.argv[4];
processFile(language, filename, parseInt(maxLength) || 6);
