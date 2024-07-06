import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9]+$/.test(v); 
        },
        message: props => `${props.value} is not a valid username! Username must include both numbers and letters.`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

registerSchema.methods.generateToken = async function() {
  try {
    return jwt.sign(
      {
        userId: this._id,
        email: this.email,
        username: this.username,
      },
      process.env.SECRET
    );
  } catch (error) {
    console.log("token error", error);
  }
};

const registerModel = mongoose.model("user", registerSchema);

export default registerModel;
