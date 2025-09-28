import { mapUsersDtoToUser } from './map-user-dto-to-user';

const defaultMock = { records: [
    {
      identity: {
        low: 0,
        high: 0,
      },
      labels: ['Person', 'Male'],
      properties: {
        name: 'Ken',
      },
      elementId: 'testId',
    },
  ],}

const mockData = Object.assign(defaultMock, {
    records: [
      {
        labels: ['Person', 'Male'],
        properties: {
          name: 'Ken',
        },
        elementId: 'testId',
      },
    ],
  });

const mockData2 = {
    records: [
      {
        identity: {
          low: 0,
          high: 0,
        },
        labels: ['Person'],
        properties: {
          name: 'Ken',
        },
        elementId: 'testId',
      },
    ],
  };

  const mockData3 = {
    records: [
      {
        identity: {
          low: 0,
          high: 0,
        },
        labels: ['Person', 'Female'],
        properties: {
          name: 'Ken',
        },
        elementId: 'testId',
      },
    ],
  };

  const mockData4 = {
    records: [
      {
        identity: {
          low: 0,
          high: 0,
        },
        labels: [],
        properties: {
          name: 'Ken',
        },
        elementId: 'testId',
      },
    ],
  };

  const mockData5 = {
    records: [
      {
        identity: {
          low: 0,
          high: 0,
        },
        labels: [],
        properties: {
          name: 'Ken',
        },
        elementId: 'testId',
      },
      {
        identity: {
          low: 0,
          high: 0,
        },
        labels: [],
        properties: {
          name: 'Kenshi',
        },
        elementId: 'testId2',
      },
    ],
  };


describe('mapUsersDtoToUser', () => {
  it('should return empty array when record is empty', () => {
    expect(
      mapUsersDtoToUser({
        records: [],
      })
    ).toEqual([]);
  });

  it('should return man when get record with man', () => {
    expect(mapUsersDtoToUser(mockData)).toEqual([
      {
        id: 'testId',
        name: 'Ken',
        gender: 'Male',
        labels: ['Person'],
      },
    ]);
  });

  it('should return woman when get record with woman', () => {
    expect(mapUsersDtoToUser(mockData3)).toEqual([
      {
        id: 'testId',
        name: 'Ken',
        gender: 'Female',
        labels: ['Person'],
      },
    ]);
  });

  it('should return user without gender when get record without gender', () => {
    expect(mapUsersDtoToUser(mockData2)).toEqual([
      {
        id: 'testId',
        name: 'Ken',
        gender: null,
        labels: ['Person'],
      },
    ]);
  });

  it('should return user without label when get record without label', () => {
    expect(mapUsersDtoToUser(mockData4)).toEqual([
      {
        id: 'testId',
        name: 'Ken',
        gender: null,
        labels: [],
      },
    ]);
  });

  it('should return two user in array when record contains two user', () => {
    expect(mapUsersDtoToUser(mockData5)).toEqual([
      {
        id: 'testId',
        name: 'Ken',
        gender: null,
        labels: [],
      },
      {
        id: 'testId2',
        name: 'Kenshi',
        gender: null,
        labels: [],
      },
    ]);
  });
});