import { createSlice } from "@reduxjs/toolkit";
import { authSignUpUser } from "./authOperations";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        nickname: null
    },
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
        }),
    },
});

// export const authSlice = createSlice({
//     name: 'authSignUp',
//     initialState: {
//         userId: null,
//         nickname: null,
//         loading: false,
//         error: false
//     },
//     reducers: {},
// })
//     extraReducers: {
//         [authSignUpUser.fulfilled]: (state, { payload }) => {
//             state.userId = payload.user.uid,
//                 state.loading = false;
//             state.error = false;
//         },
//         [authSignUpUser.pending]: (state) => {
//             state.loading = true;
//             state.error = false;
//         },
//         [authSignUpUser.rejected]: (state) => {
//             state.loading = false;
//             state.error = true;
//         }
//     }
// });

// export const authSlice = createSlice({
//     name: 'authSignIn',
//     initialState: {
//         userId: null,
//         nickname: null,
//         loading: false,
//         error: false
//     },
//     reducers: {},
//     extraReducers: {
//         [authSignUpUser.fulfilled]: (state, { payload }) => {
//             state.userId = payload.userId,
//                 state.loading = false;
//             state.error = false;
//         },
//         [authSignUpUser.pending]: (state) => {
//             state.loading = true;
//             state.error = false;
//         },
//         [authSignUpUser.rejected]: (state) => {
//             state.loading = false;
//             state.error = true;
//         }
//     }
// });

