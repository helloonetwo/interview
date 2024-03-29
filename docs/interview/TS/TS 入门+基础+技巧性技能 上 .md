# TS 入门+基础+技巧性技能 上

**技能大纲**

**13-1 TS  定义，环境搭建，6大优势**

**13-2** **tsconfig.json 常用 18 项配置选项详解** 【**加量赠送】**

**13-3  类型注解和类型推断** 

**13-4 any 和 unknown 的两个区别**

**13-5 函数和函数类型，rest 参数**

**13-6 函数类型升级**

**13-7  string 和 String 的比较**

##### 13-8  BigInt 

**13-9  看似简单的取值为何总抛错？**【**加量赠送】**

**13-10 什么场景 never 能被直接推导出来而不用定义？**【**加量赠送】**

**13-11  为什么要用枚举**？

**13-12  深入枚举 ，枚举分类，枚举底层，枚举好处【真实应用场景】**

**13-13 元组**



**13-1 TS  定义，环境搭建，6大优势**

  **定义** 

融合了面向对象后端的思想的超级版的 javaScript  语言。

**环境搭建**

```powershell
npm init -y 

yarn  add typescript -D

tsc --init
```

**优势：**

**优势1：编译时静态类型检测**：函数或方法传参或变量赋值不匹配时，会出现编译错误提示 ，规避了开发期间的大量低级错误，省时，省力。

**优势2：能自动提示**：变量类型、变量属性，不用来回切换文件或不小心写错导致的编码隐患。

**优势3：** **引入了泛型**：让大中项目，前端框架底层源码具备了高可扩展性这个巨大的优势，同时也有类型安全检查的优势。

**优势4**： **强大的 d.ts 声明文件**：声明文件像一个书的目录一样，清晰直观展示了依赖库文件的接口，type类型，类，函数，变量等声明。

**优势5：轻松编译成 JS 文件**：即使 TS 文件有错误，绝大多数情况也能编译出 JS 文件。

**优势6：灵活性高：** 尽管 TS 是一门 强类型检查语言，但也提供了 any 类型 和 as any 断言，这提供了 TS的灵活度。





**13-2** **tsconfig.json 常用 18 项配置选项详解**

```js
{
  "compilerOptions": {
    "target": "es2020", // 指定 TS 编译成 JS 后的js版本
    "module": "commonjs", // TS 编译成 JS 后采用的模块规范 commonjs amd cmd  es等         
    "lib": ["DOM","ES2020"], /*  指定 TS 编码期间可以使用的库文件版本 比如：ES5就不支持Set集合 */
    "outDir": "./dist", //     指定 TS 文件编译成 JS 后的输出目录                 /* Redirect output structure to the directory. */
    "rootDir": "./src", // 指定 TS 文件源码目录
    "strict": true, // 启用严格检查模式
    "strictNullChecks":false,// null 和 undefined即是值，也是类型, null 和 undefined 值 只能赋值给 any ,unknown和它们各自的类型
    "noImplicitAny": true, // 一般是指表达式或函数参数上有隐含的 any类型时报错
    "experimentalDecorators": true, /* 启用ES7装饰器实验开启选项 */
    "emitDecoratorMetadata": true, /* 启用装饰器元数据开启选项 */
    "declaration": true, // 指定 TS 文件编译后生成相应的.d.ts文件
    "removeComments": false, // TS 文件编译后删除所有的注释
    
    "baseUrl": "src", /* 工作根目录  解析非相对模块的基地址*/
    "paths": {
        "@/datatype/*": ["datatype/*"],
        "@/131/*": ["131/*"],
        "@/132/*": ["132/*"]
      },    
    // 有些依赖库底层 为了兼容CommonJs规范、AMD规范这二者的规范中相互兼容，
    // 使用了 export =，将二者规范统一。
    // "esModuleInterop":true表示允许依赖库中出现export = 这种兼容规范导出的格式，
    //  TS 可以用import from导入 
    "esModuleInterop": true,  
  },
  "include": [ // 需要编译的ts文件一个*表示文件匹配**表示忽略文件的深度问题
    "./src/**/*.ts" // 匹配src下所有的ts文件
, "src/datatype/typepsenumts"  ],
   "exclude": [
    "./src/**/test",
    "./src/**/premit", 
  ]
}
    
   
```



**13-3  类型注解和类型推断**

  类型注解 ——ts 在编写代码期间就能确定变量的类型

**13-4 any 和 unknown 的两个区别**

##### 13-5 函数和函数类型，rest 参数

**13-6 函数类型升级**

**13-7  string 和 String 的比较**

##### 13-8  BigInt 

##### **本节安排  1.**  number 的极限值运算    2. 使用 BigInt 

##### 1. number 的极限值运算    

```js
// 获取最大的整数值
let max = Number.MAX_SAFE_INTEGER;

 let max1 = max + 5 
 let max2 = max + 15

 console.log(max1 === max2) // 结果相同——true 
```

**2.  使用 BigInt** 

```js
方法1：
第一步：
修改 tsconfig.json 选项——"lib": ["DOM","ES2020"] 

第二步：
let max = BigInt(Number.MAX_SAFE_INTEGER);

const max1 = max + BigInt(15)
const max2 = max + BigInt(5)

console.log("max1:", max1)// 9007199254740992n
console.log("max2:", max2)
console.log(max1 === max2) // false

方法2：
第一步：
修改 tsconfig.json 选项——"lib": ["DOM","ES2020"] + "target": "es2020"

第二步：
let max = BigInt(Number.MAX_SAFE_INTEGER);

const max1 = max + 15n
const max2 = max + 5n

console.log("max1:", max1)// 9007199254740992n
console.log("max2:", max2)
console.log(max1 === max2) // false

```

**13-9  看似简单的取值为何总抛错？**



**13-10 什么场景 never 能被直接推导出来而不用定义？**

```js

// dataFlowAnalysisWithNever 方法穷尽了 DataFlow 的所有可能类型。 
// 通过这个示例，我们可以得出一个结论：
// 使用 never 避免出现未来扩展新的类没有对应类型的实现，
// 目的就是写出类型绝对安全的代码。
type DataFlow = string | number
function dataFlowAnalysisWithNever(dataFlow: DataFlow) {
  if (typeof dataFlow === 'string') {
    console.log(dataFlow)
  } else if (typeof dataFlow === 'number') {

  } else {
    // dataFlow 在这里是 never 
    let nothings = dataFlow;//never
  }
}
dataFlowAnalysisWithNever("免税店")


export { }
```



##### **13-11  枚举的好处——为什么要用枚举**？

解决多次 if /switch 判断中值的语义化的问题 

1. 常量解决       2. 常量解决带来的局限性x

**1. 常量解决**   

```js
const Status = {
  MANAGER_ADUIT_FAIL: -1,
  NO_ADUIT: 0,
  MANAGER_ADUIT_SUCCESS: 1,
  FINAL_ADUIT_SUCCESS: 2
}
// 审核类
class MyAduit {

  getAduitStatus(status: number): void {

    if (status === Status.NO_ADUIT) {
      console.log("没有审核");
    } else if (status === Status.MANAGER_ADUIT_SUCCESS) {
      console.log("经理审核通过");
    } else if (status === Status.FINAL_ADUIT_SUCCESS) {
      console.log("财务审核通过");
    }
  }
}

const aduit = new MyAduit();
aduit.getAduitStatus(Status.MANAGER_ADUIT_FAIL);
export { }
```

 **2. 常量解决带来的局限性**

方法参数不能定义为具体类型，只能初级使用 number，string 基本类型替代，降低了代码的可读性和可维护性。





**13-12  深入枚举 ，枚举分类，枚举底层，枚举好处【真实应用场景】**

1. 枚举的定义    2. 枚举分类    3. 枚举取值方式  4. 枚举底层   5. 枚举应用

**1. 枚举的定义**

定义:用来存放一组固定的常量的序列

 **2. 枚举分类**

```js
// 字符串枚举
enum EnumAuditStatus {
  MANAGER_ADUIT_FAIL = "项目经理审核失败"
  NO_ADUIT = "没有审核"
  MANAGER_ADUIT_SUCCESS = "项目经理审核成功"
  FINAL_ADUIT_SUCCESS = "财务审核成功"
}

//  字符串枚举
enum WeekEnd {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wensday = "Wensday",
  ThirsDay = "ThirsDay",
  Friday = "Friday",
  Sarturday = "Sarturday",
  Sunday = "Sunday"
}

```

```js
// 数字枚举
enum EnumAuditStatus {
  MANAGER_ADUIT_FAIL = -1,//第一个常量值设置为-1
  NO_ADUIT, // 第二个常量值自动递增1 就为0
  MANAGER_ADUIT_SUCCESS,// // // 第二个常量值自动递增2 就为1
  FINAL_ADUIT_SUCCESS // // // 第二个常量值自动递增3 就为2
}

// 数字枚举
enum Week {
  Monday = 1,
  Tuesday,
  Wensday,
  ThirsDay,
  Friday,
  Sarturday,
  Sunday
}
```

##### 3. 枚举取值方式

```js
export enum EnumAuditStatus {
  MANAGER_ADUIT_FAIL = -1,//第一个常量值设置为-1
  NO_ADUIT, // 第二个常量值自动递增1 就为0
  MANAGER_ADUIT_SUCCESS,// // // 第二个常量值自动递增2 就为1
  FINAL_ADUIT_SUCCESS // // // 第二个常量值自动递增3 就为2
}


// 取值方式1：枚举反向取值 根据枚举中常量值来取出常量名
console.log("EnumAuditStatus[0]", EnumAuditStatus[0]);
console.log("EnumAuditStatus[1]", EnumAuditStatus[1]);
// 取值方式2：枚举取值 根据枚举中常量名来取出常量值
console.log("EnumAuditStatus.FINAL_ADUIT_SUCCESS",
  EnumAuditStatus.FINAL_ADUIT_SUCCESS);	
```

##### 4. 枚举底层

##### **数字类型枚举底层**

```js
var Week;
(function (Week) {
    Week[Week["Monday"] = 1] = "Monday";
    Week[Week["Tuesday"] = 2] = "Tuesday";
    Week[Week["Wensday"] = 3] = "Wensday";
    Week[Week["ThirsDay"] = 4] = "ThirsDay";
    Week[Week["Friday"] = 5] = "Friday";
    Week[Week["Sarturday"] = 6] = "Sarturday";
    Week[Week["Sunday"] = 7] = "Sunday";
})(Week || (Week = {}));
```

##### 字符串枚举底层

```js
var WeekEnd;
(function (WeekEnd) {
    WeekEnd["Monday"] = "Monday";
    WeekEnd["Tuesday"] = "Tuesday";
    WeekEnd["Wensday"] = "Wensday";
    WeekEnd["ThirsDay"] = "ThirsDay";
    WeekEnd["Friday"] = "Friday";
    WeekEnd["Sarturday"] = "Sarturday";
    WeekEnd["Sunday"] = "Sunday";
})(WeekEnd || (WeekEnd = {}));
```

##### 5. 枚举好处

 枚举带来的好处:

1. 有默认值和可以自增值,节省编码时间

2. 语义更清晰,可读性增强,

 因为枚举是一种值类型的数据类型,方法参数可以明确参数类型为枚举类型



**6. 枚举应用**

```js
export enum EnumAuditStatus {
  MANAGER_ADUIT_FAIL = -1,//第一个常量值设置为-1
  NO_ADUIT, // 第二个常量值自动递增1 就为0
  MANAGER_ADUIT_SUCCESS,// // // 第二个常量值自动递增2 就为1
  FINAL_ADUIT_SUCCESS // // // 第二个常量值自动递增3 就为2
}


interface Expense {
  id: number,
  events: string,
  time: Date,
  enumAuditStatus: EnumAuditStatus
}

class ExpenseService {
  addExpense(expense: Expense) { }
}
let expenseService = new ExpenseService();

// 审核类
class MyAduit {
  getAduitStatus(status: EnumAuditStatus): void {
    let mystatus: EnumAuditStatus = 10;//定义枚举类型的变量
    let mystatus2: EnumAuditStatus = mystatus;
    mystatus2 = mystatus2 + 1;
    console.log("mystatus:", mystatus);//10
    console.log("mystatus2", mystatus2);//11

    if (status === EnumAuditStatus.NO_ADUIT) {//NO_ADUIT=0
      console.log("没有审核");
    } else if (status === EnumAuditStatus.MANAGER_ADUIT_SUCCESS) {
      console.log("经理审核通过");
      let expense: Expense = {
        id: 1,
        events: "飞机票报销",
        time: new Date(),
        enumAuditStatus: status
      }
      expenseService.addExpense(expense)
    } else if (status === EnumAuditStatus.FINAL_ADUIT_SUCCESS) {
      console.log("财务审核通过");
    } else {
      console.log("审核失败");
    }
  }
}

const aduit = new MyAduit();
aduit.getAduitStatus(EnumAuditStatus.FINAL_ADUIT_SUCCESS);
export { }
```

**13-13 元组**