/* 
THE APP MODELS
Contains the application in memory data, and methods to manipulate it.
*/
import { UsersModelClass } from './_users'
import { TracksModelClass } from './_tracks'
import { HistoryModelClass } from './_history'
import { TokenModelClass } from './_token'

/**
 * The model to handle the application users
 */
export const UsersModel =  new UsersModelClass()

/**
 * The model to store the application tracks retrived from spotify
 */
export const TracksModel = new TracksModelClass()

/**
 * The model to store the application tokens retrived from spotify
 */
export const TokenModel = new TokenModelClass()

/**
 * The model to store the app playback data, and methods to manipulate it
 */
export const HistoryModel = new HistoryModelClass()
