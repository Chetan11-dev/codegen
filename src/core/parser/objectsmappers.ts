const m: any = {
    s: 'String',
    i: 'int',
    db: 'double',
    d: 'dynamic',
    f: 'float',
    ls: 'List<dynamic>'
}

export function dartTypeOf(params: string) {
    return (m[params] ? m[params] : params) as string
}