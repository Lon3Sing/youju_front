import path from "path";
import {defineConfig} from "vite";
import {createVuePlugin} from "vite-plugin-vue2";
import Components from 'unplugin-vue-components/vite'
import {VuetifyResolver} from "unplugin-vue-components/resolvers";

const HOST = "0.0.0.0"
const REPLACEMENT = `${path.resolve(__dirname, './src')}/`


export default () => {
    return defineConfig({
        server: {
            host: '127.0.0.1',
            port: 8001,
            cors: true,
            open: true,
            proxy:{
                '/api': {
                    target:'http://114.116.197.62:80',
                    // target:'http://127.0.0.1',
                    // target: 'http://127.0.0.1:4523/m1/3177387-0-default',
                    // target:'http://8.130.107.193',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }

            }
        },
        resolve: {
            extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
            alias: [
                {
                    find: '@/',
                    replacement: REPLACEMENT,
                },
                {
                    find: 'src/',
                    replacement: REPLACEMENT,
                },
            ],
        },
        plugins: [
            createVuePlugin(),
            Components({
                resolvers: [
                    VuetifyResolver(),
                ],
            })
        ],
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: "\n@import '@/scss/variables.scss'\n",
                },
            },
        },

    })
}
