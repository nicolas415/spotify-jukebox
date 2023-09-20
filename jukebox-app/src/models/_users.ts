import { UserType } from "../_types/application"

/**
 * Model to handle users related data.
 * Stores the users data in the `users` property.
 */
export class UsersModelClass {
    users: { [username: string]: UserType } = {}
    users_count = 0

    /**
     * Checks if user exists in the model
     */
    isUserRegistered(username: string) {    
        return !!this.users[username.toLowerCase()]
    }
    
    /**
     * adds a new user to the model
     */
    save(username: string, user_color: string) {
        this.users_count++

        this.users[username.toLowerCase()] = {  // create user in the database object
            color: user_color,
            number: this.users_count,
            username: username,
        }
    }

    get(usernames: string)  {
        return this.users[usernames.toLowerCase()]
    }

    getUsers() {
        return this.users
    }
}
