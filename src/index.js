function cPromise(getValue, callback) {
  return new Promise((resolve, reject) => {
    try {
      const value = getValue();
      if (callback) {
        callback(null, value);
      }
      resolve(value);
    } catch (err) {
      if (callback) {
        callback(err);
      }
      reject(err);
    }
  });
};

function cPromiseAll(promises, callback, processResult) {
  return Promise.all(promises).then(
    result => {
      const value = processResult ? processResult(result) : null;
      callback && callback(null, value);
      return Promise.resolve(value);
    },
    errors => {
      callback && callback(errors);
      return Promise.reject(errors);
    }
  );
};

export class store {

  static set(key, value, callback) {
    return cPromise(() => {
      window.localStorage.setItem(key, value);
    }, callback);
  }

  static get(key, callback) {
    return cPromise(() => {
      return window.localStorage.getItem(key);
    }, callback);
  }

  static remove(key, callback) {
    return cPromise(() => {
      return window.localStorage.removeItem(key);
    }, callback);
  }

  static clear(callback) {
    return cPromise(() => {
      window.localStorage.clear();
    }, callback);
  }

  static getKeys(callback) {
    return cPromise(() => {
      const numberOfKeys = window.localStorage.length;
      const keys = [];
      for (const i = 0; i < numberOfKeys; i += 1) {
        const key = window.localStorage.key(i);
        keys.push(key);
      }
      return keys;
    }, callback);
  }

  static setMultiple(pairs, callback) {
    const promises = pairs.map(item => store.setItem(key, item[key]))
    return cPromiseAll(promises, callback);
  }

  static getMultiple(keys, callback) {
    const promises = keys.map(key => store.getItem(key));
    const processResult = result => result.map((value, i) => {
      const json = {}
      json[keys[i]] = value
      return json
    });
    return cPromiseAll(promises, callback, processResult);
  }

  static removeMultiple(keys, callback) {
    const promises = keys.map(key => store.removeItem(key));
    return cPromiseAll(promises, callback);
  }
}
