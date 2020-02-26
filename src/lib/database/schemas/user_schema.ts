import bcrypt from "bcrypt";
import { Schema, models, model, HookNextFunction } from "mongoose";
import { IUserDocument, IUserModel } from "../../../../global";

const SALT_I = 10;
const userSchema: Schema = new Schema(
  {
    name: {
      first_name: {
        type: String,
        required: true,
        index: true
      },
      last_name: {
        type: String,
        required: true,
        index: true
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: 1,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    subscribe: {
      type: Boolean,
      required: true,
      index: true
    },
    role: {
      type: Number,
      default: 0,
      index: true
    },
    cart: {
      type: Array,
      default: [],
      index: true
    },
    accessToken: {
      type: String,
      default: ""
    },
    refreshToken: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
).pre("save", function(nextMove: HookNextFunction) {
  let user = <IUserDocument>this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err: Error, salt: string) {
      if (err) return nextMove(err);
      bcrypt.hash(user.password, salt, function(err: Error, hash: string) {
        if (err) return nextMove(err);
        user.password = hash;
        nextMove();
      });
    });
  } else {
    nextMove();
  }
});

export const User: IUserModel =
  models.User || model<IUserDocument>("User", userSchema);
