import { Password } from "./../services/password-operations";
import mongoose from "mongoose";

interface UserAttributes {
    email: string;
    password: string;
}
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    createdAt: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
    build(attributes: UserAttributes): UserDoc;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            ret.id= ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashPassword = await Password.toHash(this.get("password"));
        this.set("password", hashPassword);
    }
    done();
});
userSchema.statics.build = (userAttributes: UserAttributes) => {
    return new User(userAttributes);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);


export { User };
