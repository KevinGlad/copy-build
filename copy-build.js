#!/usr/bin/env node

const fs = require('fs');
const src = './build'       // assume the build directory is in our directory
const destArg = process.argv[2] // get the first passed in argument

// if the destination doesn't exist error out
if (destArg === undefined) {
    console.log(`Destination Folder is undefined`)
    console.log('Please put the destination folder on your command line')
    console.log('copy-build {your destination folder}')
    process.exit(1)
}

// normalize dest to unix style folder seperators
dest = destArg.replace(/\\/g, "/")

if (!fs.existsSync(dest)) {
    console.log(`Destination Folder ${dest} does not exist`)
    process.exit(1)
}

// if the build folder doesn't exist error out
if (!fs.existsSync(src)) {
    console.log(`Build Folder ${build} does not exist`)
    console.log(`use "npm run build" to create build folder`)
}

// remove old files first
del(dest, false)

// copy files
copy(src, dest)
console.log(`Build Coppied to ${dest}`)

// delete files
function del(dirPath, removeSelf) {

    if (removeSelf === undefined) {
        removeSelf = true
    }

    try {
        // read the files
        let files = fs.readdirSync(dirPath)

        // do we hav files
        if (files.length > 0) {

            // get each file
            for (let fileCnt = 0; fileCnt < files.length; fileCnt++) {

                let filePath = dirPath + '/' + files[fileCnt];

                // is file a folder
                if (fs.statSync(filePath).isFile()) {

                    // just a file. Delete it
                    fs.unlinkSync(filePath)

                } else {

                    // delete all files and folder
                    del(filePath, true)

                }

            }
        }

        // remove the empty folder
        if (removeSelf) {
            fs.rmdirSync(dirPath)
        }
    }
    catch (error) {
        console.log(error)
    }

};

// copy files
function copy(srcDir, destDir) {

    // split out the dir name so we can compare to file name
    let dirArry = srcDir.split('/')
    let dirName = dirArry[dirArry.length - 1]

    // get all files as an array
    let list = fs.readdirSync(srcDir);

    // loop through each filename
    list.forEach((fileName) => {

        file = srcDir + '/' + fileName;

        // is this a directory
        let stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {

            // make the directory in the destination
            if (!fs.existsSync(`${destDir}/${fileName}`)) {
                fs.mkdirSync(`${destDir}/${fileName}`);
            }

            /* Recurse into a subdirectory */
            copy(file, `${destDir}/${fileName}`);


        } else {

            /* Is a file */
            fs.copyFileSync(file, `${destDir}/${fileName}`)

        }
    });

}