/*** React ***/
import { useCallback, useEffect } from "react";

import axios, { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

/*** Trip Chemistry ***/
/* Component */
import { AppDispatch, RootState } from "../store";
import { IWithLoadStatus, LoadStatus, IProfileId } from ".";
import { HEADERS_AXIOS } from "../common/app-const";
import { IUserProfile, defaultUserProfile } from "../interfaces/IUserProfile";
import { useParams } from "react-router-dom";
import { IProfile } from "../interfaces/IProfile";

/* Interface */

interface IAuthState extends IWithLoadStatus<{
    isAuthorized: boolean,
    doRequireInitialization?: boolean,
    profile: IUserProfile,
    // redirectPath: string,
}> {
    // setNicknameLoadStatus: LoadStatus;
};
/* DTO */
interface ILoginResultDTO {
    doRequireInitialization: boolean;
    profile: IUserProfile,
}

/* Async Thunks */
const asyncGuestSignIn = createAsyncThunk("authSlice/asyncGuestSignIn",
    async (_, thunkAPI) => {
        console.log(`[asyncGuestSignIn] POST /auth/guest/signIn`);
        try {
            const response = await axios.post(`/auth/guest/signIn`,
                // {
                //     nickname: nickname
                // },
                {
                    method: "POST",
                    headers: HEADERS_AXIOS,
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGuestSignIn] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);
const asyncGuestLogin = createAsyncThunk("authSlice/asyncGuestLogin",
    async (id: string, thunkAPI) => {
        console.log(`[asyncGuestLogin] POST /auth/guest/login`);
        try {
            const response = await axios.get(`/auth/guest/login`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGuestLogin] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncKakaoLogin = createAsyncThunk("authSlice/asyncKakaoLogin",
    async (code: string, thunkAPI) => {
        console.log(`[asyncKakaoLogin] PUT /auth/kakao/login code=${code}`);
        try {
            const response = await axios.put(`/auth/kakao/login`,
                {
                    code: code
                },
                {
                    method: "PUT",
                    headers: HEADERS_AXIOS,
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncKakaoLogin] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const asyncKakaoLogout = createAsyncThunk("authSlice/asyncKakaoLogout",
    async (id: string, thunkAPI) => {
        console.log(`[asyncLogout] GET /auth/kakao/logout id=${id}`);
        try {
            const response = await axios.get(`/auth/kakao/logout`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncLogout] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const asyncSetNickname = createAsyncThunk("authSlice/asyncSetNickname",
    async ({ id, value }: { id: IProfileId, value: String }, thunkAPI) => {
        console.log(`[asyncSetNickname] PUT /profile/setNickname?id=${id}&value=${value}`);
        try {
            const response = await axios.put(`/profile/setNickname`,
                {
                    value: value
                },
                {
                    method: "PUT",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncSetNickname] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const asyncGetProfile = createAsyncThunk("authSlice/asyncGetProfile",
    async (id: IProfileId, thunkAPI) => {
        console.log(`[asyncGetProfile] GET /profile?id=${id}`);
        try {
            const response = await axios.get(`/profile`,
                {
                    method: "GET",
                    headers: HEADERS_AXIOS,
                    params: {
                        id: id,
                    },
                });
            return response.data;
        }
        catch (e: any) {
            console.log(`[asyncGetProfile] error: ${e}`);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

/* State */
const defaultState = {
    isAuthorized: false,
    doRequireInitialization: undefined,
    profile: defaultUserProfile,
};

const initialState: IAuthState = ({
    data: defaultState,
    loadStatus: LoadStatus.REST,
    // setNicknameLoadStatus: LoadStatus.REST,
});


/* Slice */
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLoadStatus: (state, action: PayloadAction<LoadStatus>) => {
            state.loadStatus = action.payload;
        },
        authorize: (state) => {
            state.data.isAuthorized = true;
        },
        setIsInitialized: (state) => {
            state.data.doRequireInitialization = false;
        },
        // setRedirectpath: (state, action: PayloadAction<string>) => {
        //     state.data.redirectPath = action.payload;
        // },
    },
    extraReducers: (builder) => {

        /* asyncKakaoAuth */
        // builder.addCase(asyncKakaoAuth.fulfilled, (state, action: PayloadAction<ILoginResultDTO>) => {
        //     console.log(`[asyncKakaoAuth] fulfilled\n\taction.payload=${action.payload.profile.id} type=${typeof(action.payload.profile.id)}`);
        //     state.data.id = action.payload.profile.id;
        //     state.data.authProviderNickname = action.payload.authProviderNickname;
        //     state.loadStatus = LoadStatus.SUCCESS;
        // });
        // builder.addCase(asyncKakaoAuth.pending, (state, action) => {
        //     console.log(`[asyncKakaoAuth] pending`);
        //     /* https://github.com/reduxjs/redux-toolkit/issues/776 */
        //     state.loadStatus = LoadStatus.PENDING;
        // });
        // builder.addCase(asyncKakaoAuth.rejected, (state, action) => {
        //     console.log(`[asyncKakaoAuth] rejected`);
        //     state.loadStatus = LoadStatus.FAIL;
        // });

        /* asyncGuestSignIn */
        builder.addCase(asyncGuestSignIn.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
            console.log(`[asyncGuestSignIn] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
            state.data = {
                ...state.data,
                doRequireInitialization: true,
                profile: action.payload,
            };
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGuestSignIn.pending, (state, action) => {
            console.log(`[asyncGuestSignIn] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGuestSignIn.rejected, (state, action) => {
            console.log(`[asyncGuestSignIn] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncGuestLogin */
        builder.addCase(asyncGuestLogin.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
            console.log(`[asyncGuestLogin] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
            state.data = {
                ...state.data,
                doRequireInitialization: false,
                profile: action.payload,
            };
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGuestLogin.pending, (state, action) => {
            console.log(`[asyncGuestLogin] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGuestLogin.rejected, (state, action) => {
            console.log(`[asyncGuestLogin] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncKakaoLogin */
        builder.addCase(asyncKakaoLogin.fulfilled, (state, action: PayloadAction<ILoginResultDTO>) => {
            console.log(`[asyncKakaoLogin] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
            state.data.doRequireInitialization = action.payload.doRequireInitialization;
            state.data.profile = action.payload.profile;
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncKakaoLogin.pending, (state, action) => {
            console.log(`[asyncKakaoLogin] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncKakaoLogin.rejected, (state, action) => {
            console.log(`[asyncKakaoLogin] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncKaKaoLogout */
        builder.addCase(asyncKakaoLogout.fulfilled, (state, action: PayloadAction<IProfileId>) => {
            console.log(`[asyncKakaoLogout] fulfilled\n\taction.payload=${action.payload}`);
            state.loadStatus = LoadStatus.REST;
            state.data = defaultState;
        });
        builder.addCase(asyncKakaoLogout.pending, (state, action) => {
            console.log(`[asyncKakaoLogout] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncKakaoLogout.rejected, (state, action) => {
            console.log(`[asyncKakaoLogout] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncSetNickname */
        builder.addCase(asyncSetNickname.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
            console.log(`[asyncSetNickname] fulfilled\n\tpayload=${JSON.stringify(action.payload)}`);
            state.data.profile = action.payload;
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncSetNickname.pending, (state, action) => {
            console.log(`[asyncSetNickname] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncSetNickname.rejected, (state, action) => {
            console.log(`[asyncSetNickname] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

        /* asyncGetProfile */
        builder.addCase(asyncGetProfile.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
            console.log(`[asyncGetProfile] fulfilled\n\tpayload=${JSON.stringify(action.payload as IUserProfile)}`);
            state.data.profile = {
                ...state.data.profile,
                ...action.payload
            };
            state.loadStatus = LoadStatus.SUCCESS;
        });
        builder.addCase(asyncGetProfile.pending, (state, action) => {
            console.log(`[asyncGetProfile] pending`);
            /* https://github.com/reduxjs/redux-toolkit/issues/776 */
            state.loadStatus = LoadStatus.PENDING;
        });
        builder.addCase(asyncGetProfile.rejected, (state, action) => {
            console.log(`[asyncGetProfile] rejected`);
            state.loadStatus = LoadStatus.FAIL;
        });

    },
})

const useIsAuthorized = () => {
    return (
        useSelector((state: RootState) => state.auth.data.isAuthorized)
    );
}

const useIsInitialized = () => {
    return (
        useSelector((state: RootState) => !state.auth.data.doRequireInitialization)
    );
}

const useUserId: () => IProfileId = () => {
    return (
        useSelector((state: RootState) => state.auth.data.profile.id ? state.auth.data.profile.id : "not found")
    );
}

const useUserInfo: () => IUserProfile = () => {
    return (
        useSelector((state: RootState) => state.auth.data.profile)
    );
}

const useUserProfile: () => IUserProfile = () => {
    return (
        useSelector((state: RootState) => state.auth.data.profile)
    );
}

const useHasAnsweredTest = () => {
    return (
        useSelector((state: RootState) => !(state.auth.data.profile.testAnswer === null))
    )
}

const useChemistryIdList = () => {
    return (
        useSelector((state: RootState) => state.auth.data.profile.chemistryIdList)
    );
}

const useAuthorize = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        useCallback(() => {
            dispatch(authorize());
        }, [])
    )
}

const useAuthLoadStatus = () => {
    const dispatch = useDispatch<AppDispatch>();

    return ([
        useSelector((state: RootState) => state.auth.loadStatus),
        useCallback((status: LoadStatus) => {
            dispatch(authSlice.actions.setLoadStatus(status));
        }, [dispatch]),
    ] as const);
}

const useGetProfile = () => {
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */
    const id = useUserId();

    return useCallback(() => {
        console.log(`[useGetProfile] id=${id}`);
        dispatch(asyncGetProfile(id));
    }
        , [dispatch, id]);
}

const useGuestLogin = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    useEffect(() => {
        console.log(`[useGuestLogin] id=${id}`);
        if (id) {
            dispatch(asyncGuestLogin(id));
        }
    }, [ id, dispatch ])
}

export default authSlice.reducer;
export const { authorize, setLoadStatus, setIsInitialized } = authSlice.actions;
export { asyncKakaoLogin, asyncKakaoLogout, asyncGuestSignIn };

/* Selector Hooks */
export { useIsAuthorized, useIsInitialized, useUserId, useUserInfo, useUserProfile, useHasAnsweredTest, useChemistryIdList };

/* Selector & Dispatch Hooks */
export { useAuthLoadStatus, useGetProfile, useGuestLogin, useAuthorize };