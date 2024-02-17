const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      partialFilterExpression: { email: { $type: "string" } },
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      partialFilterExpression: { username: { $type: "string" } },
    },
    password: {
      type: String,
    },
    avatar: {
      type: {
        public_id: {
          type: String,
          default: null,
        },
        url: {
          type: String,
          default: null,
        },
      },
      default: null,
    },
    primaryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    loginType: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },
    providers: {
      type: [String],
      required: true,
      default: [],
    },
    google: {
      type: { id: String, picture: String, email: String, name: String },
      default: null,
    },
    facebook: {
      type: { id: String, picture: String, email: String, name: String },
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save",function(next){

     let user = this;
     bcrypt.hash(user.password,10).then(hash=>{
         user.password = hash;
         next();
     }).catch(error=>{console.log(`Error in hashing password: ${error.message}`);
     next(error);
    }); });

UserSchema.methods.passwordComparison = function(inputPassword){

        let user = this;
     return bcrypt.compare(inputPassword,user.password);
}



module.exports = mongoose.model("User", UserSchema);