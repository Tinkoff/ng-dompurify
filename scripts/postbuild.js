const fs = require('fs');

const DIST_LIB_PATH = 'dist/ng-dompurify/';
const README_PATH = 'README.md';

const PATH_TO = DIST_LIB_PATH + README_PATH;

copyReadmeIntoDistFolder();

function copyReadmeIntoDistFolder() {
    if (!fs.existsSync(README_PATH)) {
        throw new Error('README.md does not exist');
    } else {
        fs.copyFileSync(README_PATH, PATH_TO);
    }
}
