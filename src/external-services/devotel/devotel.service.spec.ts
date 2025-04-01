import { Test, TestingModule } from '@nestjs/testing';
import { DevotelService } from './devotel.service';
import { RequestService } from '../request/request.service';
import { DevotelConfigService } from '../../config/devotel/devotel-config.service';
import { IFirstProvider } from './interface/first-provider.interface';
import { ISecondProvider } from './interface/second-porvider.interface';

describe('DevotelService', () => {
  let service: DevotelService;
  let requestService: RequestService;
  let devotelConfigService: DevotelConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevotelService,
        {
          provide: RequestService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: DevotelConfigService,
          useValue: {
            fullUrl: 'http://example.com/',
          },
        },
      ],
    }).compile();

    service = module.get<DevotelService>(DevotelService);
    requestService = module.get<RequestService>(RequestService);
    devotelConfigService =
      module.get<DevotelConfigService>(DevotelConfigService);
  });
  it('should fetch first provider jobs successfully when the request is valid', async () => {
    const mockFirstProviderJobs: IFirstProvider = {
      metadata: {
        requestId: '123456',
        timestamp: '2023-05-01T12:00:00Z',
      },
      jobs: [
        {
          jobId: '1',
          title: 'Software Engineer',
          details: {
            location: 'New York',
            type: 'Full-time',
            salaryRange: '$100,000 - $150,000',
          },
          company: {
            name: 'Tech Corp',
            industry: 'Software',
          },
          skills: ['JavaScript', 'React', 'Node.js'],
          postedDate: '2023-04-30',
        },
      ],
    };
    jest.spyOn(requestService, 'get').mockResolvedValue(mockFirstProviderJobs);

    const result = await service.fetchFirstProviderJobs();

    expect(result).toEqual(mockFirstProviderJobs);
  });
  it('should fetch second provider jobs successfully when the request is valid', async () => {
    const mockResponse: ISecondProvider = {
      status: 'success',
      data: {
        jobsList: {
          job1: {
            position: 'Software Engineer',
            location: {
              city: 'New York',
              state: 'NY',
              remote: false,
            },
            compensation: {
              min: 80000,
              max: 120000,
              currency: 'USD',
            },
            employer: {
              companyName: 'Tech Corp',
              website: 'https://techcorp.com',
            },
            requirements: {
              experience: 3,
              technologies: ['JavaScript', 'React', 'Node.js'],
            },
            datePosted: '2023-05-01',
          },
          job2: {
            position: 'Data Scientist',
            location: {
              city: 'San Francisco',
              state: 'CA',
              remote: true,
            },
            compensation: {
              min: 100000,
              max: 150000,
              currency: 'USD',
            },
            employer: {
              companyName: 'Data Insights Inc',
              website: 'https://datainsights.com',
            },
            requirements: {
              experience: 5,
              technologies: ['Python', 'Machine Learning', 'SQL'],
            },
            datePosted: '2023-05-02',
          },
        },
      },
    };

    jest.spyOn(requestService, 'get').mockResolvedValue(mockResponse);

    const result = await service.fetchSecondProviderJobs();

    expect(result).toEqual(mockResponse);
  });
  it('should handle network errors gracefully when fetching first provider jobs', async () => {
    const errorMessage = 'Network error';
    jest
      .spyOn(requestService, 'get')
      .mockRejectedValue(new Error(errorMessage));

    await expect(service.fetchFirstProviderJobs()).rejects.toThrow(
      errorMessage,
    );
    expect(requestService.get).toHaveBeenCalledWith(service['provider1Url']);
  });
  it('should handle network errors gracefully when fetching second provider jobs', async () => {
    const errorMessage = 'Network error';
    jest
      .spyOn(requestService, 'get')
      .mockRejectedValue(new Error(errorMessage));

    await expect(service.fetchSecondProviderJobs()).rejects.toThrow(
      errorMessage,
    );
    expect(requestService.get).toHaveBeenCalledWith(service['provider2Url']);
  });
  it('should return the correct data structure for first provider jobs', async () => {
    const mockFirstProviderData: IFirstProvider = {
      metadata: {
        requestId: '123456',
        timestamp: '2023-05-01T12:00:00Z',
      },
      jobs: [
        {
          jobId: '1',
          title: 'Software Engineer',
          details: {
            location: 'New York',
            type: 'Full-time',
            salaryRange: '$100,000 - $150,000',
          },
          company: {
            name: 'Tech Corp',
            industry: 'Software',
          },
          skills: ['JavaScript', 'React', 'Node.js'],
          postedDate: '2023-04-30',
        },
      ],
    };

    jest.spyOn(requestService, 'get').mockResolvedValue(mockFirstProviderData);

    const result = await service.fetchFirstProviderJobs();

    expect(requestService.get).toHaveBeenCalledWith(service['provider1Url']);
    expect(result).toEqual(mockFirstProviderData);
  });

  it('should handle empty responses from the first provider', async () => {
    const emptyResponse = {};
    jest.spyOn(requestService, 'get').mockResolvedValue(emptyResponse);

    const result = await service.fetchFirstProviderJobs();

    expect(requestService.get).toHaveBeenCalledWith(service['provider1Url']);
    expect(result).toEqual(emptyResponse);
  });

  it('should handle empty responses from the second provider', async () => {
    const emptyResponse = {};
    jest.spyOn(requestService, 'get').mockResolvedValue(emptyResponse);

    const result = await service.fetchSecondProviderJobs();

    expect(requestService.get).toHaveBeenCalledWith(service['provider2Url']);
    expect(result).toEqual(emptyResponse);
  });
});
