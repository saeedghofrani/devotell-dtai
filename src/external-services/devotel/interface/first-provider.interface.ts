export interface IFirstProvider {
  metadata: IMetadata;
  jobs: IJob[];
}

interface IMetadata {
  requestId: string;
  timestamp: string;
}

interface IJob {
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
