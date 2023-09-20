import { Request, Response } from "express";
import { dataService, registerService } from "../services";
import { websocketServer } from "../websocket";

/**
 * 
 * Creates a user in the db, with the `username` key passed in the request
 * 
 * Sends an object with a username key in a cookie,
 * and sends a response indicating if user was succesfully registered
 * 
 * @requestBody `{ username: string }`
 * @responseCookie `Cookie<'jb_user', username: string, 12h>` - Set if user is registered
 * @response `{ registered: boolean, message: string }`
 */
export function buildPostRegister({ Data, Register, Websocket }: 
    { Data: typeof dataService, Register: typeof registerService, Websocket: typeof websocketServer }
) {
    return (req: Request, res: Response) => {
        let { username } = req.body

        if (!username || typeof username !== 'string') {
            res.send({ registered: false, message: 'No username provided' })
            return
        }

        if (Data.Users.isUserRegistered(username)) {
            res.send({ registered: false, message: 'Username already registered' })
            return
        } 

        Register.registerUser(username)
        Websocket.io?.emit('new_user_registered', Data.getUsers())

        res.cookie('jb_usr', username, { maxAge: 1000 * 60 * 60 * 12 })
            .send({ registered: true, message: 'User successfully registered' })
    }
}

/**
 * Checks if a user has been registered,
 * by checking in db the `username` provided in the request
 * @response boolean
 */
export function buildIsUserRegistered({ Data }: { Data: typeof dataService }) {
    return (req: Request, res: Response) => {
        const username = req.cookies?.['jb_usr']

        if (typeof username !== 'string') {
            res.send ({ registered: false })
            return
        }

        if (Data.Users.isUserRegistered(username)) {
            res.send({ registered: true })
            return
        }
        else {
            res.send ({ registered: false })
        }
    }
}
