const multer = require('multer');
const path = require('path');
global.userdata = null;



const storage = multer.diskStorage({
    destination: function (req, file,cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); 
        const fileExtension = path.extname(file.originalname); 
        const newFilename = `${timestamp}${fileExtension}`; 
        cb(null, newFilename); 
    }
});

const upload = multer({ storage: storage }); 

 function filesave(req, res, next) {
    global.userdata = req.body.user;
 upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.json({ message: 'Upload error occurred', toaststatus: "error" });
        } else if (err) {
            return res.json({ message: 'Unknown error occurred', toaststatus: "error" });
        }
        next();
    });
}



module.exports = filesave