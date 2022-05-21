import multer  from "multer"
import path from "path";

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"./upload");
    },
    filename : (req,file,cb) => {
        const newName = file.originalname.replace(/ /g,'').toLowerCase();
        cb(null,newName);
    }   
})
export default  multer({storage:storage});