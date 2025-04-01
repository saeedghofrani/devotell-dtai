import { ISecondProviderJob } from 'src/external-services/devotel/interface/second-porvider.interface';
import { INormalizaedProviderResponse } from '../interface/normalized-provider.interface';
import { JobType } from './../../../database/enum/job-type.enum';
import { ProviderType } from './../../../database/enum/provider-type.enum';
import { IFirstProviderJob } from './../../../external-services/devotel/interface/first-provider.interface';
import { NormalizationService } from './normalization.service';
import { BadRequestException } from '@nestjs/common';

describe('NormalizationService', () => {
    let service: NormalizationService;

    beforeEach(() => {
        service = new NormalizationService();
    });

    // it('should handle a job with no company details', () => {
    //     const firstProviderJob: IFirstProviderJob = {
    //         jobId: 'first-provider-123',
    //         title: 'Software Engineer',
    //         postedDate: '2022-01-01',
    //         company: null,
    //         details: {
    //             location: 'New York, NY',
    //             type: 'Full-time',
    //             salaryRange: '$50k - $70k',
    //         },
    //         skills: ['JavaScript', 'TypeScript', 'React'],
    //     };

    //     const expectedNormalizedJob: INormalizaedProviderResponse = {
    //         job: {
    //             providerId: '123',
    //             providerType: ProviderType.first,
    //             jobType: JobType['Full-Time'],
    //             position: 'Software Engineer',
    //             postedDate: new Date('2022-01-01'),
    //             minAmount: 50000,
    //             maxAmount: 70000,
    //             salaryRange: '$50k - $70k',
    //         },
    //         jobSkills: [
    //             { skill: 'JavaScript' },
    //             { skill: 'TypeScript' },
    //             { skill: 'React' },
    //         ],
    //         company: {
    //             industry: null,
    //             name: null,
    //             website: null,
    //         },
    //         location: {
    //             city: 'New York',
    //             state: 'NY',
    //         },
    //     };

    //     expect(service.normalizeFirstProvider(firstProviderJob)).toEqual(
    //         expectedNormalizedJob,
    //     );
    // });

    // it('should correctly normalize a job with multiple skills', () => {
    //     const firstProviderJob: IFirstProviderJob = {
    //         jobId: 'first-provider-123',
    //         title: 'Software Engineer',
    //         postedDate: '2022-01-01',
    //         company: {
    //             industry: 'Technology',
    //             name: 'Devotel',
    //         },
    //         details: {
    //             location: 'New York, NY',
    //             type: 'Full-time',
    //             salaryRange: '$50k - $70k',
    //         },
    //         skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    //     };

    //     const expectedNormalizedJob: INormalizaedProviderResponse = {
    //         job: {
    //             providerId: '123',
    //             providerType: ProviderType.first,
    //             jobType: JobType['Full-Time'],
    //             position: 'Software Engineer',
    //             postedDate: new Date('2022-01-01'),
    //             minAmount: 50000,
    //             maxAmount: 70000,
    //             salaryRange: '$50k - $70k',
    //         },
    //         jobSkills: [
    //             { skill: 'JavaScript' },
    //             { skill: 'TypeScript' },
    //             { skill: 'React' },
    //             { skill: 'Node.js' },
    //         ],
    //         company: {
    //             industry: 'Technology',
    //             name: 'Devotel',
    //             website: null,
    //         },
    //         location: {
    //             city: 'New York',
    //             state: 'NY',
    //         },
    //     };

    //     expect(service.normalizeFirstProvider(firstProviderJob)).toEqual(
    //         expectedNormalizedJob,
    //     );
    // });

    it('should correctly normalize a job with a remote location', () => {
        const secondProviderJob: ISecondProviderJob = {
            position: 'Software Engineer',
            datePosted: '2022-01-01',
            location: {
                city: 'Remote',
                state: null,
                remote: true,
            },
            employer: {
                companyName: 'Devotel',
                website: 'https://devotel.com',
            },
            requirements: {
                experience: 3,
                technologies: ['JavaScript', 'TypeScript', 'React'],
            },
            compensation: {
                min: 50000,
                max: 70000,
                currency: 'USD',
            },
        };

        const expectedNormalizedJob: INormalizaedProviderResponse = {
            job: {
                postedDate: new Date('2022-01-01'),
                jobType: JobType.Unknown,
                remote: true,
                position: 'Software Engineer',
                providerType: ProviderType.second,
                experience: 3,
                minAmount: 50000,
                maxAmount: 70000,
                currency: 'USD',
                providerId: '123',
                salaryRange: '50,000.00 USD - 70,000.00 USD',
            },
            jobSkills: [
                { skill: 'JavaScript' },
                { skill: 'TypeScript' },
                { skill: 'React' },
            ],
            company: {
                industry: null,
                name: 'Devotel',
                website: 'https://devotel.com',
            },
            location: {
                city: 'Remote',
                state: null,
            },
        };

        expect(service.normalizeSecondProvider('second-provider-123', secondProviderJob)).toEqual(expectedNormalizedJob);
    });

    it('should correctly normalize a job with experience requirements', () => {
        const secondProviderJob: ISecondProviderJob = {
            position: 'Software Engineer',
            datePosted: '2022-01-01',
            location: {
                city: 'New York',
                state: 'NY',
                remote: false,
            },
            employer: {
                companyName: 'Devotel',
                website: 'https://devotel.com',
            },
            requirements: {
                experience: 5,
                technologies: ['JavaScript', 'TypeScript', 'React'],
            },
            compensation: {
                min: 50000,
                max: 70000,
                currency: 'USD',
            },
        };

        const expectedNormalizedJob: INormalizaedProviderResponse = {
            job: {
                postedDate: new Date('2022-01-01'),
                jobType: JobType.Unknown,
                remote: false,
                position: 'Software Engineer',
                providerType: ProviderType.second,
                experience: 5,
                minAmount: 50000,
                maxAmount: 70000,
                currency: 'USD',
                providerId: '123',
                salaryRange: '50,000.00 USD - 70,000.00 USD',
            },
            jobSkills: [
                { skill: 'JavaScript' },
                { skill: 'TypeScript' },
                { skill: 'React' },
            ],
            company: {
                industry: null,
                name: 'Devotel',
                website: 'https://devotel.com',
            },
            location: {
                city: 'New York',
                state: 'NY',
            },
        };

        expect(service.normalizeSecondProvider('second-provider-123', secondProviderJob)).toEqual(expectedNormalizedJob);
    });

    it('should correctly normalize a job with a company website', () => {
        const firstProviderJob: IFirstProviderJob = {
            jobId: 'first-provider-123',
            title: 'Software Engineer',
            postedDate: '2022-01-01',
            company: {
                industry: 'Technology',
                name: 'Devotel'
            },
            details: {
                location: 'New York,NY',
                type: 'Full-time',
                salaryRange: '$50k - $70k',
            },
            skills: ['JavaScript', 'TypeScript', 'React'],
        };

        const expectedNormalizedJob: INormalizaedProviderResponse = {
            job: {
                providerId: '123',
                providerType: ProviderType.first,
                jobType: undefined,
                experience: null,
                position: 'Software Engineer',
                postedDate: new Date('2022-01-01'),
                minAmount: 50000,
                maxAmount: 70000,
                salaryRange: '$50k - $70k',
            },
            jobSkills: [
                { skill: 'JavaScript' },
                { skill: 'TypeScript' },
                { skill: 'React' },
            ],
            company: {
                industry: 'Technology',
                name: 'Devotel',
                website: null,
            },
            location: {
                city: 'New York',
                state: 'NY',
            },
        };

        expect(service.normalizeFirstProvider(firstProviderJob)).toEqual(
            expectedNormalizedJob,
        );
    });


    it('should throw error with a null salary range', () => {
        const firstProviderJob: IFirstProviderJob = {
            jobId: 'first-provider-123',
            title: 'Software Engineer',
            postedDate: '2022-01-01',
            company: {
                industry: 'Technology',
                name: 'Devotel',
            },
            details: {
                location: 'New York, NY',
                type: 'Full-time',
                salaryRange: null,
            },
            skills: ['JavaScript', 'TypeScript', 'React'],
        };

        expect(() => service.normalizeFirstProvider(firstProviderJob))
        .toThrow(BadRequestException);
    });

    it('should correctly normalize a job with a null experience requirement', () => {
        const secondProviderJob: ISecondProviderJob = {
            position: 'Software Engineer',
            datePosted: '2022-01-01',
            location: {
                city: 'New York',
                state: 'NY',
                remote: false,
            },
            employer: {
                companyName: 'Devotel',
                website: 'https://devotel.com',
            },
            requirements: {
                experience: null,
                technologies: ['JavaScript', 'TypeScript', 'React'],
            },
            compensation: {
                min: 50000,
                max: 70000,
                currency: 'USD',
            },
        };

        const expectedNormalizedJob: INormalizaedProviderResponse = {
            job: {
                postedDate: new Date('2022-01-01'),
                jobType: JobType.Unknown,
                remote: false,
                position: 'Software Engineer',
                providerType: ProviderType.second,
                experience: null,
                minAmount: 50000,
                maxAmount: 70000,
                currency: 'USD',
                providerId: '123',
                salaryRange: '50,000.00 USD - 70,000.00 USD',
            },
            jobSkills: [
                { skill: 'JavaScript' },
                { skill: 'TypeScript' },
                { skill: 'React' },
            ],
            company: {
                industry: null,
                name: 'Devotel',
                website: 'https://devotel.com',
            },
            location: {
                city: 'New York',
                state: 'NY',
            },
        };

        expect(service.normalizeSecondProvider('second-provider-123', secondProviderJob)).toEqual(expectedNormalizedJob);
    });
});