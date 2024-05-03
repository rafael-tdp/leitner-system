const fs = require('fs');

const readAndParseJson = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
};

const writeFile = (filePath, data) => {
    try {
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(filePath, jsonData);
    }
    catch (err) {
        console.error(err);
    }

};

module.exports =  {readAndParseJson, writeFile};