export const ValidationPatterns = Object.freeze({
    password: /((?=.*\d)|(?=.*\W))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
});
