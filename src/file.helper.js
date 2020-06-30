const fs = require('fs');

class FileHelper {

    static getFiles(dir, files_) {

        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        for (var i in files) {
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                FileHelper.getFiles(name, files_);
            } else {
                if (!name.includes('shape'))
                    files_.push(name);
            }
        }
        return files_;
    };

    static readFile(path) {
        let data = fs.readFileSync(path);
        return data;
    }

    static writeFile(path, data) {
        let logger = null;
        try {
            logger = fs.createWriteStream(path, { flags: 'a' });

            data.forEach(element => {
                logger.write(element);
            });

            logger.end();
        }
        catch (err) {
            if (logger)
                logger.end();
            return false;
        }

        return true;
    }
}

module.exports = FileHelper;