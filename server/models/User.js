import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "M", "F"],
      default: "other",
    },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 4 },
    role: { type: String, enum: ["user", "admin", "client"], default: "user" },
  },
  { collection: "users", timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = model("User", userSchema);

export default User;
