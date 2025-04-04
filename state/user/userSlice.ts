import { users } from '@/fakeData/data';
import { user } from '@/fakeData/schema';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

/**
 *  holds the state for userSlice
 */
export type UserState = {
  User: user | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

/**
 *  used to login user
 */
export type UserLoginDetails = {
  username: string;
  password: string;
};

/**
 *  used in creation of user
 */
export type UserCreationDetails = {
  username: string;
  password: string;
  email?: string;
};

/**
 *  async method that logs in user by making api call
 *
 * @param details - User Login Details
 */
export const login = createAsyncThunk(
  '/users/login',
  async (details: UserLoginDetails, thunkApi) => {
    try {
      //api call
      const { username, password } = details;
      const user = users.find((user) => user.username === username);

      if (user && user.password_hash === password) {
        return user;
      } else {
        throw new Error('User details are not correct');
      }
    } catch (err) {
      return thunkApi.rejectWithValue({
        error:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    }
  }
);

/**
 *  async method that logs out the user
 *
 *
 */
export const logout = createAsyncThunk('/users/logout', async (_, thunkApi) => {
  try {
    // api tell db that user logged out
    const result = true;
    return result;
  } catch (err) {
    // Log the error for debugging
    return thunkApi.rejectWithValue({
      error:
        err instanceof Error ? err.message : 'An unexpected error occurred',
    });
  }
});

/**
 *  async method that registers user
 *
 * @param details - User Creation Details
 */
export const register = createAsyncThunk(
  '/users/register',
  async (details: UserCreationDetails, thunkApi) => {
    try {
      const { username, password } = details;
      //api call
      const findUser = users.find((user) => user.username === username);
      if (findUser) {
        throw new Error('Username is taken');
      } else {
        let createdUser = {
          user_id: Math.floor(Math.random() * 10000000),
          username,
          password_hash: password,
          verified: false,
          created_at: new Date().toDateString(),
          last_active: new Date().toDateString(),
        };
        users.push(createdUser);
        return true;
      }
    } catch (err) {
      return thunkApi.rejectWithValue({
        error:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    }
  }
);

const initialState: UserState = {
  User: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<user>) => {
        state.status = 'succeeded';
        state.User = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';

        if (action.payload) {
          state.error = (action.payload as { error: string }).error;
        } else {
          state.error = action.error.message || 'Unknown error occurred';
        }
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<boolean>) => {
        if (action.payload) {
          state.status = 'idle';
          state.User = null;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';

        if (action.payload) {
          state.error = (action.payload as { error: string }).error;
        } else {
          state.error = action.error.message || 'Unknown error occurred';
        }
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';

        if (action.payload) {
          state.error = (action.payload as { error: string }).error;
        } else {
          state.error = action.error.message || 'Unknown error occurred';
        }
      });
  },
});

export default userSlice.reducer;
