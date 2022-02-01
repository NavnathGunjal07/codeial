const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"

    }
    ,
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship' 
        }
    ]
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' +  Date.now())
    }
  });
  
//static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model('User', userSchema);
module.exports = user;