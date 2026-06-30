const Imagekit = require('@imagekit/nodejs')

const imagekit = new Imagekit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadFile(file, fileName) {
    console.log("UPLOAD START");
    const result = await imagekit.files.upload({
        file: file.toString("base64"),
        fileName: fileName,
        folder: "/food_images",
    });

    console.log("UPLOAD END");

    return result;
}

// console.log(imagekit);
// console.log(typeof imagekit.upload);
module.exports = {
    uploadFile
}