type RefFn = (el: object|null) => void;

export default function saveRefs(m: Map<any,object>, key: any): RefFn;
