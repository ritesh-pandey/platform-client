import deepFreeze from "deep-freeze";
import UsersReducer from "./users.reducers";
import {
    RECEIVE_USER,
    SAVE_NEW_USER,
    HANDLE_REQUEST_FAILURE
} from "./users.actions";

const error = {
    errorMessage: "error!"
};

const user = {
    id: 5,
    url: "https://carolyntest.api.ushahidi.io/api/v3/users/5",
    email: "testdata@gmail.com",
    realname: "Test Data",
    logins: 0,
    failed_attempts: 0,
    last_login: null,
    last_attempt: null,
    created: "2018-05-16T16:36:24+00:00",
    updated: null,
    role: "user",
    language: null,
    contacts: [],
    allowed_privileges: [
        "read",
        "create",
        "update",
        "delete",
        "search",
        "read_full",
        "register"
    ],
    gravatar: "c1fa5461d96de458f87f6f9e82903587"
};

const initialState = {
    users: [],
    error: {},
    isSaving: false
};
describe("Users Reducer: Saving a user", () => {
    test("SAVE_NEW_USER returns current state and changes isSaving to true", () => {
        const action = {
            type: SAVE_NEW_USER
        };
        const stateAfter = {
            users: [],
            error: {},
            isSaving: true
        };

        const stateBefore = initialState;
        deepFreeze(stateBefore);
        deepFreeze(stateAfter);
        deepFreeze(action);
        expect(UsersReducer(stateBefore, action)).toEqual(stateAfter);
    });
    test("RECEIVE_USER adds a newly saved user to the users state array ", () => {
        const action = {
            type: RECEIVE_USER,
            user
        };
        const stateAfter = {
            users: [user],
            error: {},
            isSaving: false
        };

        const stateBefore = initialState;
        deepFreeze(stateBefore);
        deepFreeze(stateAfter);
        deepFreeze(action);
        expect(UsersReducer(stateBefore, action)).toEqual(stateAfter);
    });
    test("HANDLE_REQUEST_FAILURE returns users array unchanged, changes isSaving to false, and adds error", () => {
        const action = {
            type: HANDLE_REQUEST_FAILURE,
            error
        };
        // setting initial state locally so that we can test to ensure
        // the users array returns with existing users
        const localInitialState = {
            users: [user],
            error: {},
            isSaving: false
        };
        const stateAfter = {
            users: [user],
            error,
            isSaving: false
        };

        const stateBefore = localInitialState;
        deepFreeze(stateBefore);
        deepFreeze(stateAfter);
        deepFreeze(action);
        expect(UsersReducer(stateBefore, action)).toEqual(stateAfter);
    });
});