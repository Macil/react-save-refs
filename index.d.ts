type RefFn = (el: object|null) => void;

export default function saveRefs<K>(m: Map<K,any>, key: K): RefFn;
