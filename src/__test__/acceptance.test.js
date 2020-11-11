const supertest = require('supertest');

const BASE_URL = 'http://localhost/api/v1';
const request = supertest(BASE_URL);

describe('POST /records', () => {
  const RECORDS_ENDPOINT = '/records';

  it('returns VALIDATION ERROR - "startDate contains bad format"', async (done) => {
    const badRequestBody = {
      startDate: 'BAD VALUE',
      endDate: '2015-01-01',
      minCount: 2700,
      maxCount: 2800,
    };

    const { body } = await request.post(RECORDS_ENDPOINT).send(badRequestBody);

    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual('VALIDATION_ERROR');
    expect(body.detail).toMatch(/startDate/);
    expect(body.detail).toMatch(/YYYY-MM-DD/);

    done();
  });

  it('returns VALIDATION ERROR - "endDate contains bad format"', async (done) => {
    const badRequestBody = {
      startDate: '2015-01-01',
      endDate: 'BAD VALUE',
      minCount: 2700,
      maxCount: 2800,
    };

    const { body } = await request.post(RECORDS_ENDPOINT).send(badRequestBody);

    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual('VALIDATION_ERROR');
    expect(body.detail).toMatch(/endDate/);
    expect(body.detail).toMatch(/YYYY-MM-DD/);

    done();
  });

  it('returns VALIDATION ERROR - "minCount contains bad format"', async (done) => {
    const badRequestBody = {
      startDate: '2015-01-01',
      endDate: '2019-01-01',
      minCount: '2700',
      maxCount: 2800,
    };

    const { body } = await request.post(RECORDS_ENDPOINT).send(badRequestBody);

    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual('VALIDATION_ERROR');
    expect(body.detail).toMatch(/minCount/);
    expect(body.detail).toMatch(/number/);

    done();
  });

  it('returns VALIDATION ERROR - "maxCount contains bad format"', async (done) => {
    const badRequestBody = {
      startDate: '2015-01-01',
      endDate: '2019-01-01',
      minCount: 2700,
      maxCount: '2800',
    };

    const { body } = await request.post(RECORDS_ENDPOINT).send(badRequestBody);

    expect(body.code).toEqual(1);
    expect(body.msg).toEqual('Failure');
    expect(body.error).toEqual('VALIDATION_ERROR');
    expect(body.detail).toMatch(/maxCount/);
    expect(body.detail).toMatch(/number/);

    done();
  });

  it('returns Success - valid request body', async (done) => {
    const goodRequestBody = {
      startDate: '2015-01-01',
      endDate: '2019-01-01',
      minCount: 2700,
      maxCount: 2800,
    };

    const { body } = await request.post(RECORDS_ENDPOINT).send(goodRequestBody);

    expect(body.code).toEqual(0);
    expect(body.msg).toEqual('Success');
    expect(Array.isArray(body.records)).toBe(true);
    body.records.forEach((record) => {
      expect(record.key).toBeDefined();
      expect(record.createdAt).toBeDefined();
      expect(record.totalCount).toBeDefined();
    });

    done();
  });
});
