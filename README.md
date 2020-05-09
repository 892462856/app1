
npm install -g  nodemon
npm install -g node-inspector

nodemon --inspect index.js
=========================
1.全局安装node-inspect模块：npm install -g node-inspect
2.通过谷歌浏览器打开：chrome://flags/#enable-devtools-experiments
3.在cmd中输入：node --debug-brk --inspect 文件名
4.复制cmd中Debugger listening的那个URL，在谷歌浏览器中打开之后，按F12打开谷歌开发者工具可以看到下图所示内容
5.最终进入node-inspect调试界面，可以开始调试nodejs程序了！
===================
输入netstat -ano
找到你tomcat的端口号8080（有些修改过，比如修改成80，那你就找80），记下它的PID。