import { UsersModel as UsersModel_ } from "../models";
import { usersEntity as usersEntity_ } from "../entities";

export class RegisterService {
    Users: typeof UsersModel_
    UsersEntity: typeof usersEntity_

    constructor({ UsersModel, UsersEntity }: 
        { UsersModel: typeof UsersModel_, UsersEntity: typeof usersEntity_ }
    ) {
        this.Users = UsersModel
        this.UsersEntity = UsersEntity
    }

    registerUser(username: string) {
        const userColor = this.UsersEntity.getNewUserColor()
        this.Users.save(username, userColor)
    }

}