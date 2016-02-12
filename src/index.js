/* @flow */

import memoize from 'lodash/memoize';

const saversByMap: WeakMap<Map, (key: any) => (el: ?Object) => void> = new WeakMap();

export default function saveRefs(m: Map, key: any): (el: ?Object) => void {
  let saver = saversByMap.get(m);
  if (!saver) {
    saver = memoize(key => el => {
      if (el) {
        m.set(key, el);
      } else {
        saver.cache.delete(key);
        m.delete(key);
      }
    });
    saversByMap.set(m, saver);
  }
  return saver(key);
}
