import { Test, TestingModule } from '@nestjs/testing';
import { ErrorSnapshotService } from './error-snapshot.service';

describe('ErrorSnapshotService', () => {
  let service: ErrorSnapshotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorSnapshotService],
    }).compile();

    service = module.get<ErrorSnapshotService>(ErrorSnapshotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
