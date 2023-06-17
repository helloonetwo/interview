# v-if和v-show的区别
v-if在编译过程中会被转化成三元表达式,条件不满足时不渲染此节点。v-show会被编译成指令，条件不满足时控制样式将对应节点隐藏 （内部其他指令依旧会继续执行）

- 重排（回流）Reflow： 添加元素、删除元素、修改大小、移动元素位置、获取位置相关信息
- 重绘 Repaint：页面中元素样式的改变并不影响它在文档流中的位置。
> 我们应当尽可能减少重绘和回流


## v-if源码剖析: 

```js
function genIfConditions (
    conditions: ASTIfConditions,
    state: CodegenState,
    altGen?: Function,
    altEmpty?: string
    ): string {
    if (!conditions.length) {
        return altEmpty || '_e()'
    }
    const condition = conditions.shift()
    if (condition.exp) {   // 如果有表达式
        return `(${condition.exp})?${ // 将表达式作为条件拼接成元素
        genTernaryExp(condition.block)
        }:${
        genIfConditions(conditions, state, altGen, altEmpty)
        }`
    } else {
        return `${genTernaryExp(condition.block)}` // 没有表达式直接生成元素 像v-else
    }

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp (el) {
        return altGen
        ? altGen(el, state)
        : el.once
            ? genOnce(el, state)
            : genElement(el, state)
    }
}
```


## v-show源码剖析:
```js
{
    bind (el: any, { value }: VNodeDirective, vnode: VNodeWithData) {
    const originalDisplay = el.__vOriginalDisplay =
        el.style.display === 'none' ? '' : el.style.display // 获取原始显示值
        el.style.display = value ? originalDisplay : 'none' // 根据属性控制显示或者隐藏
    }  
} 
```