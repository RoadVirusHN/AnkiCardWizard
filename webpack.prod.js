const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); // 없으면 npm i -D terser-webpack-plugin
// 컴이 구리면 메모리 사용량이 커져서 빌드가 실패할 수 있음. 병렬 처리를 끄면 메모리 사용량이 줄어듬패
module.exports = merge(common, {
  mode: "production",
  devtool: false, // debug 파일 제거
  output: {
    path: path.resolve(__dirname, "release"),
    clean: true, // release 폴더 자동 청소
  },
  optimization: { // 압축
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: false, // 중요: 병렬 처리 끄기 (메모리 절약)
      }),
    ],
  }
});