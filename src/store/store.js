import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './features/authSlice';
import agentReducer from './features/agentSlice';
import campaignReducer from './features/campaignSlice';
import notificationReducer from './features/notificationSlice';

import customerReducer from './features/customerSlice';
import templateReducer from './features/templateSlice';

// import messageReducer from './slices/messageSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  agent: agentReducer,
  campaign: campaignReducer,
  notifications: notificationReducer,
  templates: templateReducer,
  customers: customerReducer,
  template: templateReducer,
 
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
