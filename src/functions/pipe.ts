export function pipe(...funcs: any[]) {
    return function(x: object) {
        return funcs.reduce((acc, func) => func(acc), x);
    };
}