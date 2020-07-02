const fs = require('fs');

class FileHelper {

    getFiles(dir, files_) {

        files_ = files_ || [];
        let files = fs.readdirSync(dir);
        for (let i in files) {
            let name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                this.getFiles(name, files_);
            } else {
                if (!name.includes('shape'))
                    files_.push(name);
            }
        }
        return files_;
    };

    readFile(path) {
        let data = fs.readFileSync(path);
        return data;
    }

    writeFile(path, data) {
        let logger = null;

        console.log(path, data);

        logger = fs.createWriteStream(path)

        logger
            .on('open', () => {
                data.forEach(element => {
                    logger.write(element);
                });
                logger.end();
            })
            .on('finish', () => {
                console.log('finish write stream, moving along');
                return true;
            })
            .on('error', (err) => { console.log(err); return false; });

    }

    writeFile2(path, data) {
        fs.writeFileSync(path, data);
        return true;
    }
}

module.exports = FileHelper;