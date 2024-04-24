// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
// import {
//   CandidatesStep1FieldType,
//   CandidatesStep2FieldType,
//   CandidatesStep3FieldType,
//   CandidatesStep4FieldType,
//   CandidatesStep5FieldType,
//   CandidatesStep6FieldType,
// } from '@/types/FormTypes';

// // Define a type for the slice state
// interface CandidateState {
//   finishRetrieveData: boolean;
//   basicData: CandidatesStep1FieldType;
//   workAcademicData: CandidatesStep2FieldType;
//   parentSiblingsData: CandidatesStep3FieldType;
//   spouseAndInlawData: CandidatesStep4FieldType;
//   peopleWithlivesAndHousingData: CandidatesStep5FieldType;
//   referencesData: CandidatesStep6FieldType[];
//   finishProcess: boolean;
//   servicesScheduled: any;
// }

// // Define the initial state using that type
// export const initialState: CandidateState = {
//   finishRetrieveData: false,
//   basicData: {} as CandidatesStep1FieldType,
//   workAcademicData: {
//     needWorkExperience: false,
//     candidateAcademicData: [],
//     candidateEmploymentData: [],
//   } as CandidatesStep2FieldType,
//   parentSiblingsData: {} as CandidatesStep3FieldType,
//   spouseAndInlawData: {} as CandidatesStep4FieldType,
//   peopleWithlivesAndHousingData: {} as CandidatesStep5FieldType,
//   referencesData: [],
//   finishProcess: false,
//   servicesScheduled: null,
// };

// export const candidatesSlice = createSlice({
//   name: 'candidates',
//   initialState,
//   reducers: {
//     saveBasicData: (state, action: PayloadAction<CandidatesStep1FieldType>) => {
//       return { ...state, basicData: action.payload };
//     },
//     saveWorkAcademicData: (
//       state,
//       action: PayloadAction<CandidatesStep2FieldType>
//     ) => {
//       return { ...state, workAcademicData: action.payload };
//     },
//     saveParentsAndSiblingsData: (
//       state,
//       action: PayloadAction<CandidatesStep3FieldType>
//     ) => {
//       return {
//         ...state,
//         parentSiblingsData: action.payload,
//       };
//     },
//     saveSpouseAndInlawData: (
//       state,
//       action: PayloadAction<CandidatesStep4FieldType>
//     ) => {
//       return { ...state, spouseAndInlawData: action.payload };
//     },
//     savePeopleWithlivesAndHousingData: (
//       state,
//       action: PayloadAction<CandidatesStep5FieldType>
//     ) => {
//       return { ...state, peopleWithlivesAndHousingData: action.payload };
//     },
//     saveReferencesData: (
//       state,
//       action: PayloadAction<CandidatesStep6FieldType[]>
//     ) => {
//       return { ...state, referencesData: action.payload };
//     },
//     setFinishProcess: (state, action: PayloadAction<boolean>) => {
//       return { ...state, finishProcess: action.payload };
//     },
//     setServicesScheduled: (state, action: PayloadAction<boolean>) => {
//       return { ...state, servicesScheduled: action.payload };
//     },
//     clearCandidatesStore: () => {
//       return { ...initialState };
//     },
//   },
// });

// export const {
//   saveBasicData,
//   saveWorkAcademicData,
//   clearCandidatesStore,
//   saveParentsAndSiblingsData,
//   saveSpouseAndInlawData,
//   savePeopleWithlivesAndHousingData,
//   setFinishProcess,
//   setServicesScheduled,
//   saveReferencesData,
// } = candidatesSlice.actions;

// // Selectors

// export const selectBasicData = (state: RootState) => state.candidates.basicData;

// export const selectWorkAcademicData = (state: RootState) =>
//   state.candidates.workAcademicData;

// export const selectParentSiblingsData = (state: RootState) =>
//   state.candidates.parentSiblingsData;

// export const selectSpouseAndInlawData = (state: RootState) =>
//   state.candidates.spouseAndInlawData;

// export const selectPeopleWithlivesAndHousingData = (state: RootState) =>
//   state.candidates.peopleWithlivesAndHousingData;

// export const selectReferencesData = (state: RootState) =>
//   state.candidates.referencesData;

// export const selectFinishProcess = (state: RootState) =>
//   state.candidates.finishProcess;

// export const selectServicesScheduled = (state: RootState) =>
//   state.candidates.servicesScheduled;

// export default candidatesSlice.reducer;

import { create } from "zustand"
import type {
    CandidatesStep1FieldType,
    CandidatesStep2FieldType,
    CandidatesStep3FieldType,
    CandidatesStep4FieldType,
    CandidatesStep5FieldType,
    CandidatesStep6FieldType,
} from '@/models/i+c/FormTypes';

interface CandidateState {
    finishRetrieveData: boolean;
    basicData: CandidatesStep1FieldType;
    workAcademicData: CandidatesStep2FieldType;
    parentSiblingsData: CandidatesStep3FieldType;
    spouseAndInlawData: CandidatesStep4FieldType;
    peopleWithlivesAndHousingData: CandidatesStep5FieldType;
    referencesData: CandidatesStep6FieldType[];
    finishProcess: boolean;
    servicesScheduled: any;

    saveBasicData: (data: CandidatesStep1FieldType) => void;
    saveWorkAcademicData: (data: CandidatesStep2FieldType) => void;
    saveParentsAndSiblingsData: (data: CandidatesStep3FieldType) => void;
    saveSpouseAndInlawData: (data: CandidatesStep4FieldType) => void;
    savePeopleWithlivesAndHousingData: (data: CandidatesStep5FieldType) => void;
    saveReferencesData: (data: CandidatesStep6FieldType[]) => void;
    setFinishProcess: (data: boolean) => void;
    setServicesScheduled: (data: any) => void;
    clearCandidatesStore: () => void;
}

export const useICCandidatesStore = create<CandidateState>((set) => ({
    finishRetrieveData: false,
    basicData: {} as CandidatesStep1FieldType,
    workAcademicData: {
        needWorkExperience: false,
        candidateAcademicData: [],
        candidateEmploymentData: [],
    } as CandidatesStep2FieldType,
    parentSiblingsData: {} as CandidatesStep3FieldType,
    spouseAndInlawData: {} as CandidatesStep4FieldType,
    peopleWithlivesAndHousingData: {} as CandidatesStep5FieldType,
    referencesData: [],
    finishProcess: false,
    servicesScheduled: null,

    saveBasicData: (data) => set((state) => ({ ...state, basicData: data })),
    saveWorkAcademicData: (data) => set((state) => ({ ...state, workAcademicData: data })),
    saveParentsAndSiblingsData: (data) => set((state) => ({ ...state, parentSiblingsData: data })),
    saveSpouseAndInlawData: (data) => set((state) => ({ ...state, spouseAndInlawData: data })),
    savePeopleWithlivesAndHousingData: (data) => set((state) => ({ ...state, peopleWithlivesAndHousingData: data })),
    saveReferencesData: (data) => set((state) => ({ ...state, referencesData: data })),
    setFinishProcess: (data) => set((state) => ({ ...state, finishProcess: data })),
    setServicesScheduled: (data) => set((state) => ({ ...state, servicesScheduled: data })),
    clearCandidatesStore: () => set((state) => ({
        finishRetrieveData: false,
        basicData: {} as CandidatesStep1FieldType,
        workAcademicData: {
            needWorkExperience: false,
            candidateAcademicData: [],
            candidateEmploymentData: [],
        } as CandidatesStep2FieldType,
        parentSiblingsData: {} as CandidatesStep3FieldType,
        spouseAndInlawData: {} as CandidatesStep4FieldType,
        peopleWithlivesAndHousingData: {} as CandidatesStep5FieldType,
        referencesData: [],
        finishProcess: false,
        servicesScheduled: null,
    })),
}))

