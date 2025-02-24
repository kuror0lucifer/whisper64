import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectUserId = (state: RootState) => state.user.userId;

export const selectUserEmail = (state: RootState) => state.user.email;

export const selectUserName = (state: RootState) => state.user.userName;

export const selectUserData = createSelector(
  (state: RootState) => state.user,
  user => ({
    userId: user.userId,
    email: user.email,
  })
);
