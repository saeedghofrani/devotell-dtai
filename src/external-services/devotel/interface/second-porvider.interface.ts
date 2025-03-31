export interface ISecondProvider {
  status: string;
  data: IData;
}

interface IData {
  jobsList: Record<string, ISecondProviderJob>;
}

export interface ISecondProviderJob {
  position: string;
  location: ILocation;
  compensation: ICompensation;
  employer: IEmployer;
  requirements: IRequirements;
  datePosted: string;
}

interface ILocation {
  city: string;
  state: string;
  remote: boolean;
}

interface ICompensation {
  min: number;
  max: number;
  currency: string;
}

interface IEmployer {
  companyName: string;
  website: string;
}

interface IRequirements {
  experience: number;
  technologies: string[];
}
