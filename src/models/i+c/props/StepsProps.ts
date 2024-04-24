import { Dispatch, SetStateAction } from 'react';

export type SimpleStudyProps = {
  studyId?: number;
  candidateId: string;
};

export type StudiesProps = {
  studyId?: number;
  candidateId: string;
  onChangeStep: Dispatch<SetStateAction<number>>;
};

export type StepsProps = {
  studyId: number;
  candidateId: string;
};
