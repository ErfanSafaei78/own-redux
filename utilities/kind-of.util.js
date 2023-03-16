export function kindOf(inp) {
    return Object.prototype.toString.call(inp).slice(8, -1).toLowerCase();
}