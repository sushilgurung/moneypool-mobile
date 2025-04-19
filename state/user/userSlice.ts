import { users } from '@/fakeData/data';
import { user } from '@/fakeData/schema';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * State interface for the user slice of the Redux store
 * @typedef {Object} UserState
 * @property {user|null} User - The currently logged in user or null if no user is logged in
 * @property {'idle'|'loading'|'succeeded'|'failed'} status - Current status of user-related operations
 * @property {string|null} error - Error message if any operation fails, or null
 */
export type UserState = {
  User: user | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

/**
 * Credentials required for user login
 * @typedef {Object} UserLoginDetails
 * @property {string} username - User's username
 * @property {string} password - User's password (will be hashed)
 */
export type UserLoginDetails = {
  username: string;
  password: string;
};

/**
 * Information required to create a new user account
 * @typedef {Object} UserCreationDetails
 * @property {string} username - Desired username for the new account
 * @property {string} password - Password for the new account
 * @property {string} [email] - Optional email address for the new account
 */
export type UserCreationDetails = {
  username: string;
  password: string;
  email?: string;
};

/**
 * Data required to update an existing user.  This is a partial User type
 * since we might not want to update all fields at once.
 * @typedef {Object} UserUpdateDetails
 * @property {number} user_id - The ID of the user to update.  Crucial for identifying the user.
 * @property {boolean} [using_biometrics] - Whether to use biometrics
 * @property {string} [email] - Optional email address for the new account
 */
export type UserUpdateDetails = {
  user_id: number;
  using_biometrics?: boolean;
  username?: string;
  password?: string;
  email?: string;
};

/**
 * Async thunk action that authenticates a user
 *
 * Makes an API call to verify user credentials and retrieves user data upon success
 *
 * @function login
 * @returns {Promise<user>} Promise that resolves to the user object on successful login
 * @throws Will reject with an error message if authentication fails
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
 * Async thunk action that logs out the current user
 *
 * Makes an API call to invalidate the user session on the server
 *
 * @function logout
 * @returns {Promise<boolean>} Promise that resolves to true on successful logout
 * @throws Will reject with an error message if logout fails
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
 * Async thunk action that registers a new user
 *
 * Makes an API call to create a new user account with the provided details
 *
 * @function register
 * @returns {Promise<boolean>} Promise that resolves to true on successful registration
 * @throws Will reject with an error message if registration fails (e.g., username taken)
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
          using_biometrics: false,
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

/**
 * Async thunk to update a user's information.
 *
 * @function updateUser
 * @param {UserUpdateDetails} details - The user ID and fields to update.
 * @returns {Promise<user>} - A promise resolving to the updated user object.
 */
export const updateUser = createAsyncThunk(
  '/users/update',
  async (details: UserUpdateDetails, thunkApi) => {
    try {
      const { user_id, ...updates } = details;

      // Simulate API call/DB update
      const userIndex = users.findIndex((user) => user.user_id === user_id);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update the user object in the array (this is simulating a DB update)
      users[userIndex] = { ...users[userIndex], ...updates };

      //return user object after it has been updated
      return users[userIndex];
    } catch (err) {
      return thunkApi.rejectWithValue({
        error:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      });
    }
  }
);

/**
 * Initial state for the user slice
 * @type {UserState}
 */
const initialState: UserState = {
  User: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Removed setUsingBiometrics as the update user thunk is now in control
  },
  extraReducers: (builder) => {
    builder
      // Login action reducers
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
      // Logout action reducers
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
      // Register action reducers
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
      })
      // Update User action reducers
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<user>) => {
        state.status = 'succeeded';
        // Update the User in the state with the updated user object
        state.User = action.payload;
        console.log('updated ', action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
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
