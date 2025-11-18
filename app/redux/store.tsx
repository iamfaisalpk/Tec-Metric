"use client";

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import employeeReducer from './slices/employeeSlice'
import departmentSlice from './slices/departmentSlice'
import positionSlice from './slices/positionSlice'
import documentTypeSlice from './slices/documentTypeSlice'
import branchSlice from './slices/branchSlice'
import deviceSlice from './slices/deviceSlice'
import breakTimeSlice from './slices/breakTimeSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        employee: employeeReducer,
        branch: branchSlice,
        department: departmentSlice,
        position: positionSlice,
        documentType: documentTypeSlice,
        device: deviceSlice,
        break : breakTimeSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
