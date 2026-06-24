import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import donorReducer from "./donorRelated/donorSlice";
import { regionReducer } from './regionRelated/regionSlice';
import { schoolReducer } from './schoolRelated/schoolSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer, 
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        donor: donorReducer,
        region: regionReducer,
        school: schoolReducer,
    },
});



export default store;
