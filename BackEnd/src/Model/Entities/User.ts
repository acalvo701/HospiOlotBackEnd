import bcrypt = require("bcrypt");
class User {
    name:string;
    password:string;

    constructor(name:string,password:string){
        this.name = name;
        this.password = password;
    }

    static async encrypt(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }
}
export = User;
