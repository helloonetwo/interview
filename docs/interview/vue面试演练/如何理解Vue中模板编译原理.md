# 如何理解Vue中模板编译原理
问题核心：如何将template转换成render函数 ?
1.将template模板转换成ast语法树 - parserHTML
2.对静态语法做静态标记 - markUp diff来做优化的 静态节点跳过diff操作
3.重新生成代码 - `codeGen` 

> src/compiler/index.js:11
```js


export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options) // 1.解析ast语法树
  if (options.optimize !== false) {          
    optimize(ast, options)                    // 2.对ast树进行标记,标记静态节点
  }
  const code = generate(ast, options)         // 3.生成代码
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})

```