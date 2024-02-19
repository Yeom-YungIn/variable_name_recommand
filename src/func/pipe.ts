export function pipe(...funcs) {
    return function(x) {
        return funcs.reduce((acc, func) => func(acc), x);
    };
}