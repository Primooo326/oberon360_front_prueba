export type LoginFieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

// Candidates

export type CandidatesStep1FieldType = {
  id: number;
  candidateId: number;
  firstLastName: string;
  middleLastName?: string;
  firstName: string;
  middleName?: string;
  documentType: number;
  identificationNumber: string;
  documentIssueDate: Date;
  documentIssuePlace: number;
  birthDate: Date;
  age: number;
  birthCountry: number;
  birthDepartment: number;
  birthTown: number;
  residenceAddress: string;
  cityResidence: number;
  district: number;
  hasMilitaryPassbook: boolean;
  militaryPassbookNumber?: number | string;
  typeOfPassbook?: number | string;
  militaryDistrict?: string;
  phone?: string;
  cellPhone: string;
  maritalStatus: number;
  childrenNumber: number;
  bodyMarkings: number;
  otherBodyMarkings?: string;
  locationBodyMarkings?: string;
  RH: number;
  height: string;
  financiallyDependentPersons: number;
  [x: string]: any;
};

export type CandidateAcademicData = {
  candidateId: number;
  indexItem: number;
  academycDegree: string;
  academyName: string;
  dateOfGrade: Date;
  studyType: number;
  [x: string]: any;
};

export type CandidateEmploymentData = {
  candidateId: number;
  indexItem: number;
  charge: string;
  companyName: string;
  dateEntry: number;
  dateLeaving: number;
  bossName: string;
  bossPhone: string;
  bossCharge: string;
  [x: string]: any;
};

export type CandidatesStep2FieldType = {
  needWorkExperience: boolean;
  candidateAcademicData: CandidateAcademicData[];
  candidateEmploymentData: CandidateEmploymentData[];
  [x: string]: any;
};

export type CandidateSiblingsData = {
  indexItem: number;
  fullName: string;
  profession: number;
  address: string;
  phone: number;
  [x: string]: any;
};

export type CandidatesStep3FieldType = {
  candidateId: number;
  motherName: string;
  motherAdrress: string;
  motherAge: number;
  motherPhone: number;
  motherProfession: number;
  motherCellPhone: number;
  motherLives: boolean;
  motherLivesWith: boolean;
  fatherName: string;
  fatherAdrress: string;
  fatherAge: number;
  fatherPhone: number;
  fatherProfession: number;
  fatherCellPhone: number;
  fatherLives: boolean;
  fatherLivesWith: boolean;
  numberOfSiblings: number;
  siblingInformation: CandidateSiblingsData[];
  [x: string]: any;
};

export type CandidatesStep4FieldType = {
  id: number;
  candidateId: number;
  fullName: string;
  identificationNumber: number;
  birthDate: Date;
  birthDepartment: number;
  birthTown: number;
  profession: number;
  yearsOfAcquaintances: number;
  age: number;
  phoneNumber?: string;
  cellPhoneNumber: string;
  motherInLawFullName: string;
  motherInLawAge: number;
  motherInLawLives: boolean;
  motherInLawAddress: string;
  motherInLawYearsOfAcquaintances: number;
  motherInLawProfession: number;
  fatherInLawFullName: string;
  fatherInLawAge: number;
  fatherInLawLives: boolean;
  fatherInLawAddress: string;
  fatherInLawYearsOfAcquaintances: number;
  fatherInLawProfession: number;
  [x: string]: any;
};

export type CandidatePeopleLiveData = {
  indexItem: number;
  fullName: string;
  age: number;
  phone: string;
  relationship: number;
  maritalStatus: number;
  profession: number;
  [x: string]: any;
};

export type CandidateHousingData = {
  candidateId?: number;
  houseType: number;
  dateFrom: string;
  district: number;
  ownerName: string;
  stratum: string;
  address: string;
  [x: string]: any;
};

export type CandidatesStep5FieldType = {
  housingData: CandidateHousingData;
  peopleNumber: number;
  peopleInformation: CandidatePeopleLiveData[];

  [x: string]: any;
};

export type CandidatesStep6FieldType = {
  candidateId?: number;
  indexItem?: number;
  fullName: string;
  relationship: number;
  phoneNumber: number;
  yearsOfAcquaintances: number;
  whereKnowFrom: string;
  profession: number;
  file?: any;
  [x: string]: any;
};
