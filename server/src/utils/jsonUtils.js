const fs = require('fs');

const writeFile = (filePath, data) => {
    try {
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(filePath, jsonData);
    }
    catch (err) {
        console.error(err);
    }

};

module.exports =  {writeFile};