import test from 'ava'
import { UsersModelClass } from '../_users'

const UsersModel = new UsersModelClass()

const teardownFn = () => {
    UsersModel.users = {}
    UsersModel.users_count = 0
}

test('add a user and check if it exists', (t) => {
    const username = 'fake_username'
    const color = '#ffffff'

    UsersModel.save(username, color)

    const isUserRegistered = UsersModel.isUserRegistered(username)
    t.true(isUserRegistered)

    t.teardown(teardownFn)
})

test('add a user and fetch it', (t) => {
    const username = 'fake_username'
    const color = '#ffffff'

    UsersModel.save(username, color)

    const user = UsersModel.get(username) 
    t.is(user.color, '#ffffff') // #ff6666 is the first user color
    t.is(user.number, 1)
    t.is(user.username, username)

    t.teardown(teardownFn)
})
