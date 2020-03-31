type RefFn = (el: object|null) => void;

export default function saveRefs<T>(m: Map<T,object>, key: T): RefFn;
