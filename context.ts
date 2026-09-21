export const vars = {
    version: "v4.2.1",
    "whats-new": `
    fixed some bugs in the zeus renderer
    `.trim(),
}


export const helpers = {
    or(a: any, b: any) {
        return a ?? b;
    },
}
