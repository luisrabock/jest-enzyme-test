const sum = require('./sum');

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

  // This function was instantiated exactly twice
  expect(someMockFunction.mock.instances.length).toBe(2);

  // The object returned by the first instantiation of this function
  // had a `name` property whose value was set to 'test'
  expect(someMockFunction.mock.instances[0].name).toEqual('test');

})