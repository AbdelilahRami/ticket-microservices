import {scryptSync, randomBytes} from 'crypto';


export class Password {

    static async toHash(password: string){
        const salt = randomBytes(8).toString('hex');
        const buffer = await scryptSync(password, salt,64);
        return `${buffer.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string){
        const [storedHashedPassword, salt]= storedPassword.split('.');
        const receivedBuffer =  await scryptSync(suppliedPassword, salt,64);
        return storedHashedPassword === receivedBuffer.toString('hex') ;
        
    }

}