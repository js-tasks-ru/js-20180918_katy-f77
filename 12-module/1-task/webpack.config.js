module.exports = {
    /**
     * Здесь должен быть описан ваш конфиг для сборки.
     * Для ссылки на текущую папку используйте встроенную переменную __dirname
     */
    context: __dirname,
    entry: "./modules/app.js",
    output: {
        path: __dirname,
        filename: "index.js"
    }
};