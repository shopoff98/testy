import { authSignUpUser, authSignInUser, authSingInUser } from "./authOperations";
import { createSlice } from "@reduxjs/toolkit";

// export const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         userId: null,
//         nickname: null,
//         stateChange: null
//     },
//     reducers: {
//         updateUserProfile: (state, { payload }) => ({
//             ...state,
//             userId: payload.uid,
//             nickname: payload.displayName
//         }),
//         authStateChange: (state, { payload }) => ({
//             ...state,
//             stateChange: payload.stateChange

//         })
//     },
// });

export const authSlice = createSlice({
    name: 'authSignUp',
    initialState: {
        userId: null,
        nickname: null,
        loading: false,
        error: false,
        stateChange: false
    },
    reducers: {
        authStateChange: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.nickname,
            stateChange: payload.stateChange
        }),
        signOutUser: () => ({
            userId: null,
            nickname: null,
            loading: false,
            error: false,
            stateChange: false
        })

    },

    extraReducers: {
        [authSignUpUser.fulfilled]: (state, { payload }) => {
            state.userId = payload.uid,
                state.nickname = payload.displayName
            state.loading = false;
            state.error = false;
        },
        [authSignUpUser.pending]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [authSignUpUser.rejected]: (state) => {
            state.loading = false;
            state.error = true;
        },
        // [authSingInUser.fulfilled]: (state, { payload }) => {
        //     state.userId = payload.uid,
        //         state.nickname = payload.displayName
        //     state.loading = false;
        //     state.error = false;
        // },
        // [authSingInUser.pending]: (state) => {
        //     state.loading = true;
        //     state.error = false;
        // },
        // [authSingInUser.rejected]: (state) => {
        //     state.loading = false;
        //     state.error = true;
        // },
    }
});

// export const authStateChangeSlice = createSlice({
//     name: 'authState',
//     initialState: {
//         userId: null,
//         nickname: null,
//         loading: false,
//         error: false,
//         stateChange: false,
//     },
//     reducers: {},

//     extraReducers: {
//         [authStateChangeUser.fulfilled]: (state, { payload }) => {
//             state.userId = payload.user.userId,
//                 state.nickname = payload.user.nickname;
//             state.stateChange = payload.user.stateChange;
//             state.loading = false;
//             state.error = false;
//         },
//         [authStateChangeUser.pending]: (state) => {
//             state.loading = true;
//             state.error = false;
//         },
//         [authStateChangeUser.rejected]: (state) => {
//             state.loading = false;
//             state.error = true;
//         }
//     }
// });



