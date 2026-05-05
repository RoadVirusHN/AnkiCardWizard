1. set Workspace typescript version to node_modules/(workspace) version, instead of dev container version.
2. css-loader 7.1.2 package conflicts with latest webpack, downgraded to css-loader 5.0.0. 
3. 개발/빌드 중에 dev container가 자주 disconnecting 된다면 wsl2의 swap 메모리를 늘려라(사용자폴더/.wslconfig의 [wsl2]의 swap=16gb 세션)
## Error의 추가
- 