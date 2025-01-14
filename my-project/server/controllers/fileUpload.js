const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileupload -> handler function
exports.localFileUpload = async (req, res) => {
    try{
        // fetch file from request
        const file = req.files.file;
        console.log("File received -> ", file);

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH -> ", path);

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        // create a successful response
        res.json({
            success: true,
            message: "Local File uploaded Successfully",
        });
    }
    catch (error) {
        console.log("Can't Upload File")
        console.log(error);
    }
}

// Checking a user file type is supported with our file type
function isFileTypeSupported (type, supportedTypes)  {
    return supportedTypes.includes(type);
}

// uploading file to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;   
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// imageUpload -> handler function
exports.imageUpload = async (req, res) => {
    try{
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Format not supported',
            })
        }

        // file format supported hai then upload to cloudinary
        console.log("Uploading to Dev");
        const response = await uploadFileToCloudinary(file, "Dev");
        console.log(response);

        // Database me entry save karna hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}


// videoUpload -> handler function
exports.videoUpload = async (req, res) => {
    try{
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;

        // Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Format not supported',
            })
        }

        // file format supported hai then upload to cloudinary
        console.log("Uploading to Dev");
        const response = await uploadFileToCloudinary(file, "Dev");
        console.log(response);

        // Database me entry save karna hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}


// imageSizeReducer -> handler function
exports.imageSizeReducer = async (req, res) => {
    try{
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Format not supported',
            })
        }

        // file format supported hai then upload to cloudinary
        console.log("Uploading to Dev");
        const response = await uploadFileToCloudinary(file, "Dev", 90);
        console.log(response);

        // Database me entry save karna hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}