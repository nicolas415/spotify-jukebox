import { redirect } from "react-router-dom";
import { checkAppAuthorized, checkUserRegistered } from "../../requests";
import { getCookieByName, getErrorMessage, removeCookieByName } from "../../utils";

/**
 * Checks if app is authorized and if user is registered
 * 
 * Redirects accordingly to the route /app, /register or /authorize
 */
export async function appStartupRedirection (request: Request) {

    try {
        const { authorized: isAppAuthorized } = await checkAppAuthorized()
        const { registered: isUserRegistered } = await checkUserRegistered()
    
        if (!isAppAuthorized) {
            if (request.url.includes('/authorize')) { // if not redirected
                return null
            }
            return redirect('/authorize')
        }
        
        if (!isUserRegistered) {

            const userCookie = getCookieByName('jb_usr')
            if (userCookie) {
                removeCookieByName('jb_usr')
            }

            if (request.url.includes('/register')) { // if not redirected
                return null
            }
            return redirect('/register')
        }

        return redirect('/app')

    } catch (e) {
        throw new Error(getErrorMessage(e))
    }
}
