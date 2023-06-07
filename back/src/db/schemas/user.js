import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: false,
      default: 0
    },
    guCode: {
      type: Number,
      required: true
    },
    guName: {
      type: String,
      required: true
    },
    is_withdrawed : {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userSchema);

export { userModel };
