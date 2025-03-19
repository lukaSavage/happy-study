import ace from 'ace-builds';
import modeJsonUrl from 'ace-builds/src-noconflict/mode-json?url';
ace.config.setModuleUrl('ace/mode/json', modeJsonUrl);  // 动态绑定语法模块路径