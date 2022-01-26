module.exports = {
    mode: "jit",
    content: ["src/**/*.{html,tsx, ts}"],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require("tailwind-scrollbar")
    ],
};
