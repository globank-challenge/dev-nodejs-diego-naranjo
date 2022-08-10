import { Test, TestingModule } from '@nestjs/testing';
import { MockService } from './mock.service';

describe('MockService', () => {
  let service: MockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockService],
    }).compile();

    service = module.get<MockService>(MockService);
  });

  const mockRepository = {
    "repositories": [
      {
        "id": 1, "state": 604
      },
      {
        "id": 2,
        "state": 605
      },
      {
        "id": 3,
        "state": 606
      }
    ]
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return mock repository', () => {
    expect(service.findAll()).toEqual(mockRepository);
  })
});
