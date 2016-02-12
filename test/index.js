/* @flow */

import assert from 'assert';
import saveRefs from '../src';

describe("saveRefs", function() {
  it("works", function() {
    const m = new Map();
    const cb = saveRefs(m, '123');

    const el1 = {el1: true};
    cb(el1);
    assert.strictEqual(m.get('123'), el1);
    const el2 = {el2: true};
    cb(el2);
    assert.strictEqual(m.get('123'), el2);
    cb(null);
    assert(!m.has('123'));
  });

  it("same map and key gets same callback", function() {
    const m = new Map();
    const cb = saveRefs(m, '123');
    assert.strictEqual(saveRefs(m, '123'), cb);
  });

  it("same map and different key gets different callback", function() {
    const m = new Map();
    const cb = saveRefs(m, '123');
    assert.notStrictEqual(saveRefs(m, '124'), cb);
  });

  it("different map and same key gets different callback", function() {
    const m = new Map();
    const cb = saveRefs(m, '123');
    assert.notStrictEqual(saveRefs(new Map(), '123'), cb);
  });

  it("different map and key gets different callback", function() {
    const m = new Map();
    const cb = saveRefs(m, '123');
    assert.notStrictEqual(saveRefs(new Map(), '124'), cb);
  });
});
