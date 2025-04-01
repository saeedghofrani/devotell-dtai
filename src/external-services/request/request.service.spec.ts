import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;
  let httpService: HttpService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        {
          provide: HttpService,
          useValue: {
            request: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            error: jest.fn(),
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RequestService>(RequestService);
    httpService = module.get<HttpService>(HttpService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('request', () => {
    it('should return data when the request succeeds', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} } as any,
      };

      (httpService.request as jest.Mock).mockReturnValue(of(mockResponse));

      const result = await service.request<{ success: boolean }>({
        url: 'https://api.example.com',
        method: 'GET',
      });

      expect(result).toEqual({ success: true });
    });
  });

  describe('get', () => {
    it('should call request with GET method', async () => {
      const spy = jest
        .spyOn(service, 'request')
        .mockResolvedValue({ data: 'test' });

      await service.get('https://api.example.com');

      expect(spy).toHaveBeenCalledWith({
        url: 'https://api.example.com',
        method: 'GET',
      });
    });
  });

  describe('post', () => {
    it('should call request with POST method and data', async () => {
      const spy = jest
        .spyOn(service, 'request')
        .mockResolvedValue({ data: 'test' });

      await service.post('https://api.example.com', { key: 'value' });

      expect(spy).toHaveBeenCalledWith({
        url: 'https://api.example.com',
        method: 'POST',
        data: { key: 'value' },
      });
    });
  });

  describe('put', () => {
    it('should call request with PUT method and data', async () => {
      const spy = jest
        .spyOn(service, 'request')
        .mockResolvedValue({ data: 'test' });

      await service.put('https://api.example.com', { key: 'value' });

      expect(spy).toHaveBeenCalledWith({
        url: 'https://api.example.com',
        method: 'PUT',
        data: { key: 'value' },
      });
    });
  });

  describe('delete', () => {
    it('should call request with DELETE method', async () => {
      const spy = jest
        .spyOn(service, 'request')
        .mockResolvedValue({ data: 'test' });

      await service.delete('https://api.example.com');

      expect(spy).toHaveBeenCalledWith({
        url: 'https://api.example.com',
        method: 'DELETE',
      });
    });
  });
});
