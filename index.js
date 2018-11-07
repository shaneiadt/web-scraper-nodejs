const rp = require('request-promise');
const cheerio = require('cheerio');
const chalk = require('chalk');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [{
    name: 'url',
    alias: 'u',
    type: String,
    multiple: false,
    defaultOption: true
}];

const cmdOptions = commandLineArgs(optionDefinitions);

if (cmdOptions.hasOwnProperty('url')) {
    const urlToScrape = cmdOptions.url;

    const options = {
        uri: urlToScrape,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then($ => {
            console.log(chalk.green(`Successful Scrape [${urlToScrape}]`));
            let pageTitle = chalk.hex('#F1F1F1').bold($('h1').text().trim());
            console.log(`Page Title: ${pageTitle}`);
        })
        .catch(data => {
            console.log(chalk.red(`Error`));
            console.log(data);
        });
}else{
    console.log(chalk.yellow(`Please specify a url to scrape with flag. [i.e. node index.js --url http://www.test.com/]`));
}