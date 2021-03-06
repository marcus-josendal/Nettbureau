module.exports = {
    presets: [
        '@babel/typescript',
        ["@babel/preset-env", {
            "targets": {
                "esmodules": true
            }
        }
        ]
    ],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-transform-async-to-generator'
    ]
}
