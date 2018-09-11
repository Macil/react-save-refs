import saveRefs from '../..';

// This file isn't executed. Typescript just checks it for type safety.

interface Bar {
  x: number;
}

function foo() {
  const m = new Map<string,Bar>();
  const cb = saveRefs(m, '123');
  cb({x: 1});
  cb({x: 2});
  cb(null);
}
