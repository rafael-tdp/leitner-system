const fs = require('fs');

const FILE_PATH = "./src/infrastructures/data/cards.json";

const writeFile = (data) => {
    try {
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(FILE_PATH, jsonData);
    }
    catch (err) {
        console.error(err);
    }

};

module.exports =  {writeFile};