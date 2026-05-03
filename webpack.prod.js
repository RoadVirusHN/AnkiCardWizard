const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); // 없으면 npm i -D terser-webpack-plugin
// 컴이 구리면 메모리 사용량이 커져서 빌드가 실패할 수 있음. 병렬 처리를 끄면 메모리 사용량이 줄어듬
// 사용자 폴더에 .wslconfig 파일 생성 후 [wsl2] section을 추가하고 memory=4GB로 설정, swap=16GB로 설정하면 WSL2의 메모리 사용량을 제한할 수 있음. 이렇게 하면 빌드가 안정적으로 완료될 가능성이 높아짐
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