var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

mongoose.connect(process.env.MONGOLAB_URI);

var userSchema = new Schema({
    local            : {
        username     : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

/*var bookSchema = new Schema({
  bookid: {type:String, unique:true, required:true},
  imgURL: String,
  fortrade: Boolean
});*/

module.exports = mongoose.model('User', userSchema);
//module.exports.book = mongoose.model('Book', bookSchema);