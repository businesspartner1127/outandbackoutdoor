const path = require("path")

module.exports = {
    entry: {
        'product-description': "./scripts/product-description.js",
        'sell-back': "./scripts/sell-back.js",
        'navbar': "./scripts/navbar.js",
        'event-modal': "./scripts/event-modal.js",
        'wizard': "./scripts/wizard.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "assets")
    }
}