const Jsonnet = require('@rbicker/jsonnet');
const chokidar = require('chokidar');
const fs = require('fs')
const dirPath = 'jsonnet'
chokidar.watch(`./${dirPath}`).on('all', (event, path) => {
    if (event === 'change') {
        let pathArray = path.split("\\");
        var code = fs.readFileSync(`./${path}`, 'utf-8');
        const jsonnet = new Jsonnet();
        var result = jsonnet.eval(code);
        var fileName = pathArray[1];
        try {
            fs.writeFileSync(`./json/${fileName.split('.')[0]}.json`, JSON.stringify(result))
            console.log("Converted to Json successfully")
        } catch (err) {
            console.error(err)
        }
    }
});

