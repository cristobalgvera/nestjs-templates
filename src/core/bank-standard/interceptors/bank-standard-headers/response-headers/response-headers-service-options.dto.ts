import { ResponseHeadersDto } from './dto';

export const RESPONSE_HEADERS_SERVICE_OPTIONS =
  'RESPONSE_HEADERS_SERVICE_OPTIONS';

export type ResponseHeadersServiceOptions = Readonly<
  Pick<ResponseHeadersDto, 'Local-Transaction-Id'>
>;
