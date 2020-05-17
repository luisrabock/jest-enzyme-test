const sum = require('./index');
jest.mock('./foo'); // this happens automatically with automocking
const foo = require('./foo');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  test('Object assignment', () => {
    const data = [1];
    data.push(2);
    expect(data).toEqual([1,2])
  })

  test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });

  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

  
function fetchData(callback) {
    setTimeout(() => {
        callback('peanut butter')
    }, 100)
}

function fetchDataPromisse(callback) {
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve('peanut butter')
        }, 100)
    })
}
/*
  // Don't do this!
test('the data is peanut butter', () => {
    function callback(data) {
      expect(data).toBe('peanut butter');
    }
  
    fetchData(callback);
  });*/

test("the data is peanut butter", done => {
    function callback(data) {
        try {
          expect(data).toBe("peanut butter");
          done();
        }
        catch {
          done("The data is not peanut butter");
        }
    }
  fetchData(callback);
});

test('the data is peanut butter', () => {
  return fetchDataPromisse().then(data => {
    expect(data).toBe('peanut butter');
  });
});

test('the data is peanut butter', () => {
  return expect(fetchDataPromisse()).resolves.toBe('peanut butter');
});

let cities = []

initializeCityDatabase = () => {
  cities.push('Vienna');
  cities.push('San Juan');
}

clearCityDatabase = () => {
  cities = [];
  return cities.length == 0
}

isCity = (city) => {
  return city.includes(city);
}

beforeEach(() => {
  initializeCityDatabase();
  clearCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});



test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

/*it('City are clean', () => {
  expect(isCity.toHaveLength());
});*/



test('City are clean', () => {
  expect(clearCityDatabase(cities)).toBeTruthy();
});

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
test("mockCallback", () => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 8], mockCallback);
  
  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);
  
  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  
  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(8);
  
  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
})

test('Mock propertie', () => {
  const myMock = jest.fn();

  const a = new myMock();
  const b = {};
  const bound = myMock.bind(b);
  bound();
  console.log(myMock.mock.instances);
})


test('Mock tests', ()=> {
  // The function was called exactly once
  const someMockFunction = jest.fn(() => "return value");
  someMockFunction("first arg", "second arg");

  expect(someMockFunction.mock.calls.length).toBe(1);

  // The first arg of the first call to the function was 'first arg'
  expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

  // The second arg of the first call to the function was 'second arg'
  expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

  // The return value of the first call to the function was 'return value'
  expect(someMockFunction.mock.results[0].value).toBe('return value');

  const someMockContructor = jest.fn();

  const test = new someMockContructor();

  test.name = "test";

  const test_2 = new someMockContructor();

  // This function was instantiated exactly twice
  expect(someMockContructor.mock.instances.length).toBe(2);

  // The object returned by the first instantiation of this function
  // had a `name` property whose value was set to 'test'
  expect(someMockContructor.mock.instances[0].name).toEqual('test');

})


test("mock implementation", () => {
  const mock = jest.fn(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("also mock implementation", () => {
  const mock = jest.fn().mockImplementation(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock implementation one time", () => {
  const mock = jest.fn().mockImplementationOnce(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");

  expect(mock("baz")).toBe(undefined);
  expect(mock).toHaveBeenCalledWith("baz");
});

test("mock return value", () => {
  const mock = jest.fn();
  mock.mockReturnValue("bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock promise resolution", () => {
  const mock = jest.fn();
  mock.mockResolvedValue("bar");

  expect(mock("foo")).resolves.toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});


const doAdd = (a, b, callback) => {
  callback(a + b);
};

test("calls callback with arguments added", () => {
  const mockCallback = jest.fn();
  doAdd(1, 2, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(3);
});

test('Mock Return Values', () => {
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined

  myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true);

  console.log(myMock(), myMock(), myMock(), myMock());
})

test('Mock Return Values', () => {
  const filterTestFn = jest.fn();

  // Make the mock return `true` for the first call,
  // and `false` for the second call
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter(num => filterTestFn(num));

  console.log(result);
  // > [11]
  console.log(filterTestFn.mock.calls);
  // > [ [11], [12] ]
})


test('Mock Implementations', () => {
  const myMockFn = jest.fn(cb => cb(null, true));

  myMockFn((err, val) => console.log(val));
  // > true
})

test('foo is a mock function', () => {
  // foo is a mock function
  foo.mockImplementation(() => 42);
  foo();
  // > 42
})

test('mockImplementation', () => {
  const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

  myMockFn((err, val) => console.log(val));
  // > true

  myMockFn((err, val) => console.log(val));
  // > false
})

test('mockImplementation_v2', () => {
  const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default'
})

test('return this', () => {
  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
  };
  
  // is the same as
  
  const otherObj = {
    myMethod: jest.fn(function () {
      return this;
    }),
  };

  console.log(myObj.myMethod());
  console.log(otherObj.myMethod());
})

test('Mock Names', () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(scalar => 42 + scalar)
    .mockName('add42');

    myMockFn();
    expect(myMockFn).toHaveBeenCalled();
})

test('Custom matchers mock functions', () => {
  const mockFunc = jest.fn();
  const arg1 = 'arg1';
  const arg2 = 'arg2';

  mockFunc();
  mockFunc(arg1, arg2);
  // The mock function was called at least once
  expect(mockFunc).toHaveBeenCalled();

  // The mock function was called at least once with the specified args
  expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

  // The last call to the mock function was called with the specified args
  expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

  // All calls and the name of the mock is written as a snapshot
  expect(mockFunc).toMatchSnapshot();
})

test('common matchers', () => {
  const mockFunc = jest.fn().mockName('a mock name');
  const arg1 = 42;
  const arg2 = 'arg2';

  mockFunc(arg1, arg2);
  // The mock function was called at least once
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

  // The mock function was called at least once with the specified args
  expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

  // The last call to the mock function was called with the specified args
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
    arg1,
    arg2,
  ]);

  // The first arg of the last call to the mock function was `42`
  // (note that there is no sugar helper for this specific of an assertion)
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

  // A snapshot will check that a mock was invoked the same number of times,
  // in the same order, with the same arguments. It will also assert on the name.
  expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
  expect(mockFunc.getMockName()).toBe('a mock name');
})