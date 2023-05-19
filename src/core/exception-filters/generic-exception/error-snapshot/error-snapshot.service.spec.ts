import { ErrorSnapshotService } from './error-snapshot.service';
import { ErrorSnapshotHelperService } from './error-snapshot-helper.service';
import { TestBed } from '@automock/jest';
import { ErrorResponseDto } from './dto';

describe('ErrorSnapshotService', () => {
  let underTest: ErrorSnapshotService;
  let helperService: ErrorSnapshotHelperService;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ErrorSnapshotService).compile();

    underTest = unit;
    helperService = unitRef.get(ErrorSnapshotHelperService);
  });

  describe('getSnapshot', () => {
    beforeEach(() => {
      jest.spyOn(helperService, 'getCode').mockReturnValue(400 as any);

      jest
        .spyOn(helperService, 'getDescription')
        .mockReturnValue('description' as any);

      jest.spyOn(helperService, 'getType').mockReturnValue('type' as any);
    });

    it('should return the snapshot', () => {
      const actual = underTest.getSnapshot(
        'http_status' as any,
        'exception' as any,
      );

      expect(actual).toMatchInlineSnapshot(`
        {
          "Result": {
            "CanonicalError": {
              "code": "400",
              "description": "description",
              "type": "type",
            },
            "SourceError": {
              "ErrorSourceDetail": {
                "source": "CHK",
              },
              "code": "400",
              "description": "description",
            },
            "status": "ERROR",
          },
        }
      `);
    });

    it('should get the code using the correct parameters', () => {
      const expected = 'http_status';

      const helperServiceSpy = jest.spyOn(helperService, 'getCode');

      underTest.getSnapshot(expected as any, 'exception' as any);

      expect(helperServiceSpy).toHaveBeenCalledWith(expected);
    });

    describe('when the HTTP status code is not found', () => {
      let actual: ErrorResponseDto;

      beforeEach(() => {
        jest
          .spyOn(helperService, 'getCode')
          .mockReturnValueOnce(undefined as any);

        actual = underTest.getSnapshot(
          'http_status' as any,
          'exception' as any,
        );
      });

      it('should return the CanonicalError code field as undefined', () => {
        expect(actual.Result.CanonicalError.code).toBeUndefined();
      });

      it('should return the SourceError code field as undefined', () => {
        expect(actual.Result.SourceError.code).toBeUndefined();
      });
    });

    it('should get the description using the correct parameters', () => {
      const expected = 'exception';

      const helperServiceSpy = jest.spyOn(helperService, 'getDescription');

      underTest.getSnapshot('http_status' as any, expected as any);

      expect(helperServiceSpy).toHaveBeenCalledWith(expected);
    });

    it('should get the type using the correct parameters', () => {
      const expectedStatus = 'http_status';
      const expectedException = 'exception';

      const helperServiceSpy = jest.spyOn(helperService, 'getType');

      underTest.getSnapshot(expectedStatus as any, expectedException as any);

      expect(helperServiceSpy).toHaveBeenCalledWith(
        expectedStatus,
        expectedException,
      );
    });
  });
});
