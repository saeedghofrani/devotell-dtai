export interface IFirstProvider {
  metadata: IMetadata;
  jobs: IFirstProviderJob[];
}

interface IMetadata {
  requestId: string;
  timestamp: string;
}

export interface IFirstProviderJob {
  jobId: string;
  title: string;
  details: IDetails;
  company: ICompany;
  skills: string[];
  postedDate: string;
}

interface IDetails {
  location: string;
  type: string;
  salaryRange: string;
}

interface ICompany {
  name: string;
  industry: string;
}
