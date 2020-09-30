import  mongoose  from 'mongoose';

interface UserAttributes {
    email: string,
    password: string
}
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    createdAt: string
}
interface UserModel extends mongoose.Model<UserDoc> {
    build(attributes: UserAttributes): UserDoc;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.statics.build =(userAttributes: UserAttributes)=> {
    return new User(userAttributes);
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({email:'', password: ''});

export { User };
