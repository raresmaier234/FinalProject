import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { loginActions } from "./loginSlice";

export const getUser = createAsyncThunk("getUser", async ({ payload }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/login`,
        method: "POST",
        data: payload
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(loginActions.setItem({ item: data }));

        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});

// export const getMonthClocking = createAsyncThunk(
//     "getMonthClocking",
//     async ({ employeeIds = null, date, structureIds = null, teamIds = null, functionIds = null, includeWrongRegistrations }, thunkAPI) => {
//         const options = {
//             url: `/clocking/all`,
//             method: "GET",
//             headers: {
//                 "X-Loading": true,
//             },
//             params: {
//                 employeeIds,
//                 date,
//                 structureIds,
//                 teamIds,
//                 functionIds,
//                 isErroneusClocking: includeWrongRegistrations,
//             },
//         };
//         try {
//             const response = await Axios(options);
//             const data = response?.data;

//             thunkAPI.dispatch(clockingActions.setTableData(data));
//             return true;
//         } catch (e) {
//             return thunkAPI.rejectWithValue({
//                 error: true,
//                 code: e.response?.data?.error?.code,
//                 message: "SomethingWentWrong",
//             });
//         }
//     }
// );

// export const getAllClockingsResources = createAsyncThunk("getAllClockingsResources", async ({ structureIds = null }, thunkAPI) => {
//     const options = {
//         url: `/clocking-resources`,
//         method: "GET",
//         params: { structureIds },
//     };
//     try {
//         const response = await Axios(options);
//         const data = response?.data;

//         thunkAPI.dispatch(clockingActions.setFilterResouces(data));
//         if (structureIds) {
//             thunkAPI.dispatch(clockingActions.setTeams(data?.teams));
//         }

//         return data;
//     } catch (e) {
//         return thunkAPI.rejectWithValue({
//             error: true,
//             message: "SomethingWentWrong",
//         });
//     }
// });

// export const getIndividualClockingResources = createAsyncThunk(
//     "getIndividualClockingResources",
//     async ({ month, structureIds, resources = ["structures", "employees", "functions", "teams"] }, thunkAPI) => {
//         const options = {
//             url: `/clocking-individual/resources`,
//             method: "POST",
//             headers: {
//                 "X-Loading": true,
//             },
//             data: {
//                 month,
//                 structureIds,
//                 resources,
//             },
//         };
//         try {
//             const response = await Axios(options);
//             let data = response?.data;
//             if (resources?.[0] === "teams") {
//                 thunkAPI.dispatch(clockingActions.setFilterTeams(data?.teams));
//             } else {
//                 thunkAPI.dispatch(clockingActions.setFilterResouces(data));
//             }
//             return data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue({
//                 error: true,
//                 message: "SomethingWentWrong",
//             });
//         }
//     }
// );

// export const getTaskCopyResources = createAsyncThunk("getTaskCopyResources", async ({ employeeId, date }, thunkAPI) => {
//     const options = {
//         url: `/task-copy-resources`,
//         method: "GET",
//         params: {
//             employeeId: employeeId,
//             date: date,
//         },
//     };
//     try {
//         const response = await Axios(options);
//         thunkAPI.dispatch(clockingActions.setTaskCopyResources(response?.data));
//         return response?.data;
//     } catch (e) {
//         return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
//     }
// });

// export const copyTask = createAsyncThunk("copyTask", async ({ taskId, dates }, thunkAPI) => {
//     const options = {
//         url: `/tasks/${taskId}/copy`,
//         method: "POST",
//         data: {
//             dates,
//         },
//     };
//     try {
//         await Axios(options);

//         return true;
//     } catch (e) {
//         return thunkAPI.rejectWithValue({
//             error: true,
//             code: e.response?.data?.error?.code,
//             message: e.response?.data?.error?.code === "E0203" ? "ExcedeedClockingDuration" : "SomethingWentWrong",
//         });
//     }
// });

// export const fetchLockedClockings = createAsyncThunk(
//     "fetchLockedClockings",
//     async (
//         { offset = 1, limit = 25, sortBy = "month", sortType = "asc", month = null, includeWrongRegistrations = false, structureIds = null, teamIds = null },
//         thunkAPI
//     ) => {
//         const options = {
//             url: `/monthly-clocking-locked`,
//             method: "POST",
//             data: {
//                 offset,
//                 limit,
//                 sortBy,
//                 sortType,
//                 month,
//                 includeWrongRegistrations,
//                 structureIds,
//                 teamIds,
//             },
//         };
//         try {
//             const response = await Axios(options);
//             const data = response?.data;

//             thunkAPI.dispatch(clockingActions.setBlockedUnblockedTableData({ quantity: data?.quantity, items: data?.items }));
//             return true;
//         } catch (e) {
//             return thunkAPI.rejectWithValue({
//                 error: true,
//                 code: e.response?.data?.error?.code,
//                 message: "SomethingWentWrong",
//             });
//         }
//     }
// );

// export const fetchUnlockedClockings = createAsyncThunk(
//     "fetchUnlockedClockings",
//     async (
//         { offset = 1, limit = 25, sortBy = "month", sortType = "asc", month, includeWrongRegistrations = false, structureIds = null, teamIds = null },
//         thunkAPI
//     ) => {
//         const options = {
//             url: `/monthly-clocking-unlocked`,
//             method: "POST",
//             data: {
//                 offset,
//                 limit,
//                 sortBy,
//                 sortType,
//                 month,
//                 includeWrongRegistrations,
//                 structureIds,
//                 teamIds,
//             },
//         };
//         try {
//             const response = await Axios(options);
//             const data = response?.data;

//             thunkAPI.dispatch(clockingActions.setBlockedUnblockedTableData({ quantity: data?.quantity, items: data?.items }));
//             return true;
//         } catch (e) {
//             return thunkAPI.rejectWithValue({
//                 error: true,
//                 code: e.response?.data?.error?.code,
//                 message: "SomethingWentWrong",
//             });
//         }
//     }
// );

// export const lockClocking = createAsyncThunk("lockClocking", async ({ payload }, thunkAPI) => {
//     const options = {
//         url: `/monthly-clocking-lock`,
//         method: "POST",
//         data: payload,
//     };
//     try {
//         const response = await Axios(options);
//         const data = response?.data;

//         return true;
//     } catch (e) {
//         return thunkAPI.rejectWithValue({
//             error: true,
//             message: "SomethingWentWrong",
//         });
//     }
// });

// export const fetchClockingResources = createAsyncThunk(
//     "fetchClockingResources",
//     async ({ month, resources = ["structures", "employees", "functions", "teams"], structureIds }, thunkAPI) => {
//         const options = {
//             url: `/monthly-clocking-locked/resources`,
//             method: "POST",
//             data: {
//                 month,
//                 resources,
//                 structureIds,
//             },
//         };
//         try {
//             const response = await Axios(options);
//             const data = response?.data;

//             if (resources?.[0] === "teams") {
//                 thunkAPI.dispatch(clockingActions.setFilterTeams(data?.teams));
//             } else {
//                 thunkAPI.dispatch(clockingActions.setFilterResouces(data));
//             }
//             return data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue({
//                 error: true,
//                 code: e.response?.data?.error?.code,
//                 message: "SomethingWentWrong",
//             });
//         }
//     }
// );

// export const updateOvertime = createAsyncThunk("updateOvertime", async ({ date, overtimeInMinutes, employeeId }, thunkAPI) => {
//     const options = {
//         url: `/monthly-clocking-overtime`,
//         method: "PUT",
//         data: {
//             date,
//             overtimeInMinutes,
//             employeeId,
//         },
//     };
//     try {
//         await Axios(options);

//         return true;
//     } catch (e) {
//         return thunkAPI.rejectWithValue({
//             error: true,
//             code: e.response?.data?.error?.code,
//             message: "SomethingWentWrong",
//         });
//     }
// });

// export const addHistoryHumanResourcesClockings = createAsyncThunk("addHistoryHumanResourcesClockings", async ({ payload }, thunkAPI) => {
//     const options = {
//         url: `/clocking-history`,
//         method: "POST",
//         data: payload,
//         headers: {
//             "Content-Type": "application/json",
//             "X-Loading": false,
//         },
//     };
//     try {
//         await Axios(options);

//         return true;
//     } catch (e) {
//         return thunkAPI.rejectWithValue({ error: true, message: "SomethingWentWrong" });
//     }
// });