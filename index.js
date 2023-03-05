// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
const questionsArray = [
    {
        type: 'input',
        name: 'title', 
        message: 'Name of Application?',
    },
    {
        type: 'input',
        message: 'Give your Project a description',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Describe the steps needed to install your application to function',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Provide an example of usage of the application, If needed you can add screenshots using syntax: \n ```md \n ![alt text](assets/images/screenshot.png) \n   ```\n',
        name: 'usage',
    },
    {
        type: 'list',
        message: 'Choose your license from Options',
        choices:['MIT License', 'GNU General Public License v3.0', 'Apache License 2.0'],
        name: 'license',
    },
    {
        type: 'input',
        message: 'What are your guidlines for future contributers.',
        name: 'contributions',
    },
    {
        type: 'input',
        message: 'Enter current year?',
        name: 'year'
    },
    {
        type: 'input',
        message: 'Provide your GitHub Username',
        name: 'gitHubUser'
    },
    {
        type: 'input',
        message: 'Provide your preffered Email for contact',
        name: 'email'
    }
];

// A function to write README file
function writeToFile(template) {
    const readMeInfo = template;
    fs.writeFile('README.md', readMeInfo, (err) => 
    err ? console.log(err) : console.log('Your Read was Created!!'))
    }

//Inquirer install
inquirer
    .prompt(questionsArray)
    .then((data) => {
        let licenseTxt = data.license;
        let licenseBadge = licenseTxt;

// License Notice Templates for README. Maligned with code to prevent formatting errors in implementation
const apacheLicense = `
    Apache License 2.0
    Copyright (c) ${data.year} ${data.devName}
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
    `;
const gnuLicense = ` 
    GNU General Public License v3.0
    Copyright (c) ${data.year} ${data.devName}
    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 
    You should have received a copy of the GNU General Public License along with this program. If not, see (https://www.gnu.org/licenses/).`;
const mitLicense = `
    MIT License
    Copyright (c) ${data.year} ${data.devName}
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`;


    // switch statement, based off your choice of badge including the badge photo
            switch (licenseBadge, licenseTxt){
                case 'Apache License 2.0': {
                    licenseBadge = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
                    licenseTxt = apacheLicense
                    break; 
                }             
                case 'GNU General Public License v3.0': {
                    licenseBadge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
                    licenseTxt = gnuLicense
                    break;                     
                }
                case 'MIT License':{
                    licenseBadge =  `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
                    licenseTxt = mitLicense;
                    break;  
            }
        }

// README.md Template for use in file generation
const readMeGen = `
# ${data.title}

## Description
${data.description}

## Table of Contents
If your README is Is to vast or difficult to organize, you can organize catagorically here with a table of contents.
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## Credits
If you have questions or want more info Please feel free to email me!
Email: [${data.email}](mailto:${data.email}) \n
GitHub Username: [${data.gitHubUser}](https://github.com/${data.gitHubUser})

## License
${licenseBadge}
${licenseTxt}

## How to Contribute
${data.contributions}
`;

        writeToFile(readMeGen);
    })
    