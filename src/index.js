/* @flow */

import memoize from 'lodash/memoize';

type RefFn = (el: any|null) => void;

const saversByMap: WeakMap<Map<any,any>, (key: any) => RefFn> = new WeakMap();

export default function saveRefs<K>(m: Map<K,any>, key: K): RefFn {
  let saver = saversByMap.get(m);
  if (!saver) {
    saver = memoize(key => el => {
      if (el) {
        m.set(key, el);
      } else {
        (saver:any).cache.delete(key);
        m.delete(key);
      }
    });
    saversByMap.set(m, saver);
  }
  return saver(key);
}
