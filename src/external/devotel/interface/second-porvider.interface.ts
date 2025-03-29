export interface ISecondProvider {
  status: string;
  data: IData;
}

export interface IData {
  jobsList: IJobsList;
}

export interface IJobsList {
  jobsList: Record<string, IJob>;
}

export interface IJob522 {
  position: string;
  location: Location;
  compensation: ICompensation;
  employer: IEmployer;
  requirements: IRequirements;
  datePosted: string;
}

export interface ILocation {
  city: string;
  state: string;
  remote: boolean;
}

export interface ICompensation {
  min: number;
  max: number;
  currency: string;
}

export interface IEmployer {
  companyName: string;
  website: string;
}

export interface IRequirements {
  experience: number;
  technologies: string[];
}

export interface IJob903 {
  position: string;
  location: Location2;
  compensation: Compensation2;
  employer: Employer2;
  requirements: Requirements2;
  datePosted: string;
}

export interface Location2 {
  city: string;
  state: string;
  remote: boolean;
}

export interface Compensation2 {
  min: number;
  max: number;
  currency: string;
}

export interface Employer2 {
  companyName: string;
  website: string;
}

export interface Requirements2 {
  experience: number;
  technologies: string[];
}
