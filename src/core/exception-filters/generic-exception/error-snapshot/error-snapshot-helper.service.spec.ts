import { Test, TestingModule } from '@nestjs/testing';
import { ErrorSnapshotHelperService } from './error-snapshot-helper.service';

describe('ErrorSnapshotHelperService', () => {
  let service: ErrorSnapshotHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorSnapshotHelperService],
    }).compile();

    service = module.get<ErrorSnapshotHelperService>(
      ErrorSnapshotHelperService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
