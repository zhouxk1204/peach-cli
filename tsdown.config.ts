import { defineConfig } from "tsdown";

export default defineConfig(
    {
        entry: "src/index.ts", // 入口文件
        format: ["esm"], // 输出格式
        clean: true, // 清理输出目录
        outDir: "dist", // 输出目录
        sourcemap: true, // 生成 sourcemap
        minify: true, // 压缩输出
    }
);
