/*
------------------------ 01. ts基础 -----------------------------
一、TypeScript的介绍
    1.介绍
        ·什么是TypeScript？
            ts是微软开发的一款开源的编程语言，它是js的超集，遵循最新的ES6规范，拓展了js语法
    2.安装
        npm i -g typescript
        或 yarn global add typescript
    3.使用
        由于浏览器不支持ts语法，所以需要转换成es5及以下的语法
    4.转换(手动编译)
        在文件夹下通过tsc index.ts命令进行编译
    5.vscode编辑器自动编辑ts文件(自动编译)
        ①、在目标文件夹通过   tsc --init  命令生成一个tsconfig.js文件
        ②、修改该文件的17行，将"outDir": "./" 修改为 "outDir": "./js"
        ③、点击vscode的终端-运行任务-typescript-ts监视 即可自动编译
二、Typescript的数据类型(11个)
    ·布尔类型(boolean)
    ·数字类型(number)
    ·字符串类型(string)
    ·数组类型(array)
        ts定义数组有三种方式：
            第一种：let arr1:number[] = [2,4,5,6]       // 类型[]形式， 注意：这里由于规定用number，所以数组的元素都必须是number类型
            第二种：let arr2:Array<any> = ['fsd',3,4]    // Array<类型>形式，注意事项同上，数组泛型，后面会讲
    ·元组类型(tuple)
        属于数组的一种，即ts可以规定数组元素的类型
            let arr:[string, number, boolean] = ["ts", 3.18, true]
    ·null类型与undefined类型
        默认情况下，null和undefined是所有类型的子类型
        注意：如果要给一个变量更大的范围，可以这样写：
            let sth:number | undefined;
            console.log(sth)
            还有其他写法：
                let str:null = null
                let str:undefined = undefined
                let str:null = undefined
                let str:undefined = null
    ·枚举类型(enum)
        主要用来定义标识符或者状态的，让程序更容易理解，通常写法如下
            enum Sex {
                man = 3,                       // 默认是0, 当man是3时，woman的值依次加1，为4
                woman,
            }

            -------- 通过枚举类型的标识符拿到值↓ ----------
            console.log(Sex.man);              // 3
            console.log(Sex.woman);            // 4

            -------- 通过值拿到枚举类型的标识符↓ ----------
            console.log(Sex[0]);               // undefined
            console.log(Sex[3]);               // man
            console.log(Sex[4]);               // woman

    ·任意类型(any)
        ‘any’类型是一种强大的兼容存在的JavaScript库的类型系统。他允许跳过TypeScript的编译时类型的检查。
        使用场景：
            ①、数组
                let arr: any[] = ['张三',23]
    ·void类型
        ①、表示没有任何类型，和any相反，一般用在定义函数或者方法的时候没有返回值的时候
        ②、如果声明一个void类型的变量，只能为他赋值于null或者undefined，其他的会报错
            function demo():void{
                console.log('呵呵')
            }
    ·never类型
        ①、代表那些永不存在值的类型，如下
            1)抛出异常的函数
            2)不会有返回值的函数表达式
            3)使用type声明一个交叉类型，如 type Ss = number & string;    ===>结果拿到的是never
        ②、never类型是任何类型的子类型(包括null和undefined)，也可以赋值给任何类型：如下案例：
            var a:never;
            a=(()=>{
                throw new Error('错误')
            })()
            // 定义成以上信息不会报错
        ③、没有类型是never类型的子类型，任何类型也不可以赋值给never类型(除never本身之外)
    ·object类型
        表示非原始类型，也就是除number、string、boolean、symbol之外的类型
        在编写类声明文件(.d.ts后缀)时，object类型就有很大的作用
        拓展：
            ①、大 Object代表所有拥有 toString、hasOwnProperty 方法的类型所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)
                let ObjectCase: Object;
                ObjectCase = 1; // ok
                ObjectCase = "a"; // ok
                ObjectCase = true; // ok
                ObjectCase = null; // error
                ObjectCase = undefined; // error
                ObjectCase = {}; // ok
            ②、{} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合
                let simpleCase: {};
                simpleCase = 1; // ok
                simpleCase = "a"; // ok
                simpleCase = true; // ok
                simpleCase = null; // error
                simpleCase = undefined; // error
                simpleCase = {}; // ok
    ·unknown类型（ts3.0新增）
        对照于any，unknown是类型安全的。 任何值都可以赋给unknown，但是当没有类型断言或基于控制流的类型细化时unknown不可以赋值给
        其它类型，除了它自己和any外。 同样地，在unknown没有被断言或细化到一个确切类型之前，是不允许在其上进行任何操作的(例如调用属性或方法)
        解决该问题的办法是使用类型断言或者类型保护
        示例：
            type T00 = unknown & null;                 // null
            type T01 = unknown & undefined;            // undefined
            type T02 = unknown & null & undefined;     // null & undefined (which becomes never)
            type T03 = unknown & string;               // string
            type T04 = unknown & string[];             // string[]
            type T05 = unknown & unknown;              // unknown
            type T06 = unknown & any;                  // any

            // In a union an unknown absorbs everything

            type T10 = unknown | null;                  // unknown
            type T11 = unknown | undefined;             // unknown
            type T12 = unknown | null | undefined;      // unknown
            type T13 = unknown | string;                // unknown
            type T14 = unknown | string[];              // unknown
            type T15 = unknown | unknown;               // unknown
            type T16 = unknown | any;                   // any

三、类型断言
    ·介绍
        1)在开发中，会遇到这种情况，你知道某个实体最终返回的类型，我们可以通过类型断言的方式告诉浏览器
        2)类型断言相当于其他编程语言的类型转换，但是不进行特殊的数据检查和解构
        3)没有运行时的影响，只是在编译阶段起作用
    ·类型断言的两种方式
        1)尖括号写法
            如 let obj:any = '我是一个字符串'
                let str:string = (<string>obj).slice(1)    //明确告诉浏览器这是string类型
        2)as语法
            如 let obj:any = '我是一个字符串'
                let str:string = (obj as string).slice(1)    //明确告诉浏览器这是string类型
        ★★注意：
            当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
    
    拓展：非空断言
        给变量加个！代表不需要做判断了，这里永远能匹配到
        let a!；
    ·双重断言
        1）双重断言用于处理当想将S类型的变量断言为T类型，但是S类型和T类型互相兼容的情况
        2）双重断言基于两个前提   
            (1) 子类型可以被断言为父类型
            (2) any 这种类型可以被赋值给几乎其他任何类型（never 等除外）
        3）双重断言断言可以实现 子类型转换为另外一种子类型（ 子类型->父类型->子类型）
        ★注意：尽量不使用双重断言，双重断言会破坏原有类型关系★
        
        示例如下↓
            function handle(event: Event) {
                const element = (event as any) as HTMLElement; // 双层
            }
    ·类型推断(了解即可)
        TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。
        例如： let a = 123;    // 此时ts会自动推断出a的类型为number
               a ='改一下';    // 报错，ts不允许修改
四、类型声明
    ·type关键字(通常用于定义基本类型)
        type在ts中主要用来定义一个类型的，用法如下↓↓↓
        1）定义一个基本类型
            type Mystr = string;
        2）定义一个联合类型或者交叉类型、元祖类型
            interface A {
                a: number;
            }
            interface B {
                b: string;
            }
            type Suibian = A | B;
            // 变量demo既要a属性又要b属性
                const demo: Suibian = {
                    a: 123,
                    b: 'biliibli'
                }
            type Ss = string & number;                             ==>相当于never类型
            let cc: A | B = {a: 18, b: 'zhangsan'};                ==>cc变量时联合类型，说明两个属性都需要定义，不然报错
            type Turp = [string, number];
        3）定义一个对象类型
            type User = {
                name: string
                age: number
            };
        4)定义一个函数类型
            type Func = (name: string, age: number)=> void;
    ·interface接口(通常用于定义对象类型)
        接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。说白了也是定义类型的。用法如下↓↓↓
        1）定义一个函数类型的接口
            interface Func {
                (name: string):void;
            }
        2) 定义一个对象类型
            interface Obj {
                name: string;
            }
        3) 定义一个任意类型或者数组类型(索引签名)
            interface Arr {
                [index: string]: any,      //代表任意类型
                [index: number]: string   //代表一个字符串的数组集合
            }
        4) 定义一个函数表达式
            interface FE {
                eat(name: string):void;
            }
        5）定义一个类
            interface ClockConstructor {
                new (hour: number, minute: number);
            }

            class Clock implements ClockConstructor {
                currentTime: Date;
                constructor(h: number, m: number) { }
            }
        6）定义一个泛型
            interface Func {
                <T>(name: T, sex: T): T;
            }
        ----------
        ·可选属性
            interface Myits {
                iAge?: number;      // 如果是一个可选参数，只需要加一个问号即可
            }
        ·只读属性
            interface Demo {
                readonly x: number;
            }
            const p: Demo = {
                x:5
            }
            p.x = 6;   // 报错，因为x是只读的。
        ·可索引属性
            typeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
            这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）去索引等同于使
            用"100"（一个string）去索引，因此两者需要保持一致。
            class Animal {
                name: string;
            }
            class Dog extends Animal {
                breed: string;
            }
            // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
            interface NotOkay {
                [x: number]: Animal;
                [x: string]: Dog;
            }
        ·类类型接口
            即使用接口去约束一个类
            interface A {
                hehe: string,
                setTime(d: number): void   // 定义一个函数类型
            }
            interface B {
                haha: string
            }
            class demo implements A, B {    // implements 是个关键字，代表该类遵循了这样的一个接口类型(如果遵循多个接口，用逗号隔开)
                hehe: string;
                haha: string;
                setTime(d: number){
                    ...
                }
            }
        ·接口的继承
            // 相当于type定义类型的时候使用交叉类型
            interface A {
                eat():void;
            }
            interface B extends A {
                speak(): any;
            }
    拓展：type和interface有什么区别？
        相同点：
            都可以描述一个对象或者函数
        不同点：
            1.interface方式可以实现接口的extends/implements，而type不行(但是type可以通过交叉类型实现interface的extends行为)，
                并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 与 interface 类型 交叉 。
                虽然效果差不多，但是两者语法不同。
                ①、interface extends interface
                    interface Name {
                        name: string;
                    }
                    interface User extends Name {
                        age: number;
                    }
                ②、interface extends type
                    type Name = {
                        name: string;
                    }
                    interface User extends Name {
                        age: number;
                    }
                ----------
                ③、type 与 type 交叉
                    type Name = {
                        name: string;
                    }
                    type User = Name & { age: number  };
                ④、type 与 interface 交叉
                    interface Name {
                        name: string;
                    }
                    type User = Name & {
                        age: number;
                    }
            2.type可以声明基本类型别名，联合类型，元组等类型，但interface不行
            3.type 语句中还可以使用 typeof 获取实例的 类型进行赋值
                // 当你想获取一个变量的类型时，使用 typeof
                let div = document.createElement('div');
                type B = typeof div
            4.interface可以声明合并，而type不行
                interface User {
                    name: string
                    age: number
                }
                interface User {
                    sex: string
                }
                ------相当于以下声明↓↓↓
                    User 接口为 {
                        name: string
                        age: number
                        sex: string
                    }
        总结：
            一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。其他更多详情参看 官方规范文档

五、TS中的函数
    ·函数的可选参数
        function suibian(a:number, b?:number){
            ···
        }
        suibian(1)
        suibian(1，2)
    ·函数的默认值(详见请参考，此处略~ )
    ·函数重载(overload)
        介绍：如以下案例，不设定重载我们传什么都行，但设定重载之后，用户只能传number和string两种类型，其他类型会报错。
        用法：
            let obj:object = {}; 
            // 定义两个重载
            function demo(a: number):void
            function demo(a: string):void
            function demo(a: any):void {
                if(typeof a === 'string'){
                    obj.a = '我是一个字符串'
                }
                if(typeof a === 'number'){
                    obj.b = '我是一个数字'
                }
            }
            demo('张三');
            demo(234);
            demo(true);      // 报错，没有与此调用匹配的重载。
        ★★特别说明：重载的定义和函数的声明必须定义在一起
    拓展：用ts如何定义箭头函数？
        // 使用type关键字来定义函数声明
        type Suibian = (firstName: String, lastName: string) => void;
        const a:Suibian = (firstName: String, lastName: string)=>{}
六、TypeScript的类
    1.ts中类的访问控制修饰符
        在使用typescript定义类的属性的时候，它给我们提供了三种修饰符：
            ·public           // 默认，在类里面、子类、类外面都可以访问
                例子：
                    class A {
                        constructor(public name: string ){}   // ts类中参数属性的写法
                    }
                    ------- ==>参数属性的写法，相当于↓
                    class A {
                        public name: string;
                        constructor(name: string) {
                            this.name = name;
                        }
                    }

            ·protected          // 在类里面、子类可以访问，类外面不能访问
                class Parent {
                    constructor(protected name: string) {
                        this.name = name;
                    }
                }
                class Son extends Parent {
                    constructor(name: string) {
                        super(name);
                    }
                    getFatherName(name:string){
                        return this.name;          // 子类可以访问的
                    }
                }
                const s = new Son('zhangsan');
                console.log(s.name);                // 报错，类外面不能访问
            ·private          // 在类里面可以访问，子类、类外面不能访问
                （参考上面的例子）
        ★★注意： 在类里面不加修饰符，默认属于public共有类
    2.ts类中的只读属性readonly和静态属性static
        class Demo {
            constructor(public readonly name: string){
                this.name = name;
            }
        }
        const p = new Demo('测试');
        p.name = 'fsdf';   // 报错，因为name是只读属性
    3.装饰器
        装饰器是一种特殊的类型声明，他能够附加到类声明、属性、方法或者参数上，可以修改类的行为
        ·作用范围：
            修饰器只能用于类(包括类的属性、方法、参数)中，不能用于函数，因为存在函数提升。
        ·分类
            ①、类装饰器
            ②、属性装饰器
            ③、方法装饰器
            ④、参数装饰器
        ·写法：
            装饰器的写法分为普通装饰器和装饰器工厂
        ①、类装饰器
            类装饰器相当于aa(A), 即把A当做参数，调用了一下aa函数
            function aa(constructor: Function){
                // 这里的constructor指向的是类A的构造函数
                constructor.prototype.name = 'zhu'
            }

            @aa
            class A {
                ···
            }
            // 等同于以下代码
            A = aa(A) || A;
        ②、属性装饰器(了解)
            属性装饰器用来装饰类的属性，会在运行时当做函数被调用，传入两个参数：
                ·第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
                ·第二个参数是属性的名称
            class B {
                function bb(target: any, prototypeName: any){
                    console.log(tafget[prototypeName])
                }
                @bb
                name: string = 'zhangsan'
            }
        ③、方法装饰器(了解)
            方法装饰器用来装饰方法，传入三个参数：
                ·target:第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
                ·prototypeName:第二个参数是方法的名称
                ·第三个参数是方法描述符
        ④、参数装饰器(了解)
            参数装饰器用来装饰类方法的参数，传入三个参数：
                ·target:第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
                ·methodName: 第二个参数代表类里面方法的名字
                ·paramsIndex： 第三个参数代表参数的索引
    4.ts中的抽象类
        使用abstract关键字来定义的一种类，特点是：
            ①、无法被实例化，只能继承
            ②、抽象方法不能再抽象类中实现(即只能像定义属性一样定义，不能写成方法)，抽象方法定义好后，必须在继承的子类中再次定义同名方法
        ·用法
            ·abstract关键字，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
        ·说明
            ①、抽象方法只能定义在抽象类当中，不然会报错
            ②、抽象类和抽象方法用来定义标准。(标准：继承的子类必须包含抽象类中的抽象方法)
        ·使用
            abstract class Person {
                name: string = '张三'
                abstract eat():void;  // 只能定义，不能写成 eat(){} 这种实现的方式(注意：只能定义抽象方法，没有抽象属性这个概念)
            }
            // const p = new Person();   错误，不能实例化
            class Son extends Person {
                suibian(){}
                eat(){}     // 子类必须写该方法，不然会报错
            }

        拓展：
            ·抽象类 VS 接口
                1) 抽象类本质是一个无法被实例的类，其中能够实现抽象方法和初始化属性，而接口仅能够用于描述，既不是提供方法的实现，也不为属性进行初始化
                2）一个父类只可以继承一个子类或抽象类，但可以实现多个接口
                3）抽象类可以实现接口
            ·一个类中同时出现类、接口、抽象类的写法
            abstract class Father {
                name: 'father',
                abstract: eat():void;
            }
            interface A {
                sleep(): void;
            }
            class Son extends Father implements A {
                eat(){},
                sleep(){}
            }
    5.把类当做接口来使用
        ·介绍
            类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。
        ·使用
            class Point {
                x: number;
                y: number;
            }

            interface Point3d extends Point {
                z: number;
            }
            let point3d: Point3d = {x: 1, y: 2, z: 3};
六、泛型
    ·什么是泛型？
        泛型(Generics)是指在定义函数、接口或者类的时候，不预先指定接口的类型，而是使用的时候再指定类型的一种特性
    ·使用
        泛型通常有如下写法：
        *泛型函数
            function test<T>(value: T):T{
                return value;
            }
            test<number>(100);     // 调用的时候指定类的类型为number类型
            test(100);            // 由于类型推论，编译器译器会根据传入的参数自动地帮助我们确定T的类型，这里我们不写<number>也行
        *泛型类
            class Son<T>{
                name: T[] = [];     // T[] 数组类型的泛型
                myFunc():T{ ··· }
            }
            const p = new Son<string>('张三');      // 实例化的时候指定类的类型为string
            注意：
                ①、类有两部分：静态部分和实例部分
                ②、泛型类指的是实例部分的类型，所以类的静态部分属性不能使用泛型类型
        *泛型接口(通常用于函数接口)
            interface Config {
                <T>(value:T):T;
            }
            const f:Config = function<T>(value:T):T{
                return value;
            }
            f<number>(2)           // 给泛型指定为number
        *多个泛型参数
            function Demo<A, B>(arr:[A, B]):[B, A]{
                return [arr[1], arr[0]]
            }
        *默认泛型
            function test<T = string>(value: T):T{
                return value;
            }

    ·泛型约束(使用extends去拓展T)
        有时我们需要去操作某一类型的一组值，并且我们知道这组值具有什么样的属性，这时，可以定义一个接口来描述约束条件
        interface My {
            num: number
        }
        function demo<T extends My>(n:T[]): T[]{
            console.log(n.num)
            return n;
        }
七、类型的兼容性
    1.基本类型的兼容性(以少赋多)
        let a: number | string;
        let b: string = '呵呵';
        a = b;     // OK,编译正确
    2.对象的兼容性(以多赋少)
        interface Named {
            name: string;
        }

        let x: Named;
        let y = { name: 'Alice', location: 'Seattle' };
        x = y;    // OK，编译正常
    3.类的兼容性(以多赋少)
        class Small {
            name: string = '张三';
        }
        class Big extends Small {
            age: number = 18;
        }
        let a: Small;
        a = new Big()      // OK,编译正确

        let b: Big;
        b = new Small()    // ERROR,编译错误
    4.接口的兼容(以多赋少)
        interface Small {
            name: string;
            age: number;
        }
        interface Big {
            name: string;
            age: number;
            eat(): void;
        }
        function test(arg: Small) {

        }
        let p: Big = {
            name: '张三',
            age: 18,
            eat(){}
        }
        test(p);  // OK,编译正常，传入的参数只能比原先Small包含且可以多
    5.函数的兼容性(两种情况)
        1）针对于函数的参数列表(以少赋多)
            let x = (a: number) => 0;
            let y = (a: number, b: string) => 0;

            y = x; // OK
            x = y; // Error
            如果是联合类型则可以(以多赋少)
                let x = (a: number) => 0;
                let y = (a: number|boolean) => 0;

                y = x; // Error
                x = y; // OK
        2）针对于函数的返回值(以多赋少)
            let x = () => ({name: 'Alice'});
            let y = () => ({name: 'Alice', location: 'Seattle'});

            x = y; // OK,编译正确
            y = x; // Error,编译错误
    6.泛型兼容性
        interface Empty<T> {
        }
        let x!: Empty<number>;    // 这里代表{}
        let y!: Empty<string>;    // 这里也是{}

        x = y;  // OK,编译成功
        -------------------
        interface Empty<T> {
            data: T;
        }
        let x!: Empty<number>;    // 这里代表{data: number}
        let y!: Empty<string>;    // 这里也是{data: string}

        x = y;  // ERROR,编译错误
    7.枚举的兼容性(以少赋多)
        枚举类型和数字类型两者相互兼容
        不同枚举之间是不兼容的
        enum Num {
            red,
            green
        }
        let c: Num;
        c = red;   // 0    说明枚举和数字是兼容的
    8.函数参数双向协变(以多赋少)
        type A = (a: string) => void;
        let suibian: A;
        function demo(a: string | number):void{
            console.log(a)
        }
        suibian = demo;      // 这是兼容的
八、类型保护
    ·什么是类型保护？
        类型保护就是一些表达式，他们在编译的时候就能沟通过类型信息确保某个作用域内变量的类型
        类型保护就是通过关键字(typeof、instanceof等等来判断)判断出分支的类型
    ·链判断运算符(?.)(目前处于step1阶段，ts暂不支持)
        链判断运算符是一种先检查属性是否存在，在尝试访问该属性的运算符，其符号为?.
    ·自定义类型保护
        要自定义一个类型保护，只需要简单的为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
        类型谓词的语法为xxx1 is xxx2 的形式，其中xxx1必须是当前函数签名里的一个参数名
        interface Bird {
            name: string'
        }
        interface Dog {
            name: string;
        }
        function isBird(x: Bird|Dog): x is Bird {

        }
九、类型变换
    ·索引访问操作符(通过[]来获取一个类型的子类型)
        interface Person {
            name: string;
            favorite: {
                eat: string;
            }
        }
        const myEat: Person[favorite][eat] = '吃肉';

    ·keyof索引类型查询操作符(获取一个对象的所有属性名)
        interface A {
            name: string;
            age: number;
        }
        type B = keyof A;     // keyof 等同于 type B = 'name' | 'age';
    ·映射类型
        在映射类型里，新类型以相同的形式去转换旧类型里每个属性。(用in操作符去批量定义类型)
        interface Init {
            name: string;
            age: number;
            like: string | number;
        }

        type MyType = {
            [key in keyof Init]?:Init[key]
        }
        以上代码可以转换成↓↓↓
        type MyType = {
            name?: string;
            age?: number;
            like?: string | number;
        }

        const p: MyType = {
            name: '张三'    // 由于MyType的所有属性可以选，可以只写一个
        }
        拓展：
            ①、必填的映射类型
                type A<T> = {
                    [key in keyof T]-?: T[key]
                }
    ·条件类型
        在定义泛型的时候可以添加逻辑分支，让泛型更加灵活
        type A<T> = T extends Fish ? One : Two;
        type other:A<Fish> = {
            name: '用'
        }
    ·Pick
        interface A {
            name: string;
            age: number;
        }
        type Demo = Pick<A, 'name'>;    // 等同于 type A = { name: string; }
十、内置条件类型
    ·Exclude<T, U> -- 从T中剔除可以赋值给U的类型
        这个接口主要是运用到了条件类型的分发！源码如下
            type Exclude<T, U> = T extends U ? never : T;
        例如
            type R = Exclude<1 | 2 | 3 , 1 | 2>
            // R = 3
            解释一下：
                1）1是 1 | 2 的子类型，所以得到的结果是never
                2）2是 1 | 2 的子类型，所以得到的结果是never
                3）3不是 1 | 2 的子类型，所以得到的结果是 3
                最终R的类型为 never | never | never | 3,即 type R = 3
        
    ·Extract<T, U> -- 提取T中可以赋值给U的类型。
        和Exclude接口相反
        例如：
            type R = Extract<1 | 2 | 3 , 1 | 2>
            // R = 1 | 2
    ·NonNullable<T> -- 从T中剔除null和undefined。
        源码如下
            type NonNullable<T> = T extends null | undefined ? never : T;
        例子：
            type R = NonNullable<'a' | null |undefined>
            // R = 'a'
    ·ReturnType<T> -- 获取函数返回值类型。
        源码如下
            type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any; 
            (infer：用于条件中的类型推导，该关键字这里暂时不做过多解释，推文：https://blog.csdn.net/huangfengnt/article/details/124734974)
        例子：
            type Fuc = (name: string, age: number) => void
            type getFucReturn<T> = T extends (name: any, xx: number) => infer U ? U : T
            type F = getFucReturn<Fuc>  // void
    ·InstanceType<T> -- 获取构造函数类型的实例类型(了解)。
        源码如下
            type InstanceType<T extends Constructor> = T extends new (...args: any[]) => infer R ? R : any;
        例子：
            class Person {
                name: string;
                constructor(name: string) {
                    this.name = name;
                }
                getName() { console.log(this.name) }
            }
            type Instance = InstanceType<typeof Person>;
            // Person
    
十一、内置工具类型
    ·Partial<T>  将传入对象类型的属性由非可选变为可选
        源码
            // 注意：这里传入的T是一个类型，通常会传<typeof obj>进去
            type Partial<T> = { [P in keyof T]?: T[P] };
        例子：
            interface A {
                a1: string;
                a2: number;
                a3: boolean;
            }
            type aPartial = Partial<A>;
            const a: aPartial = {}; // 不会报错
    ·Required<T> 将所有传入对象类型的属性变为必选项（这里用-?修饰符来实现，+?代表变为可选，-?代表必选）
        源码
            type Require<T> = { [P in keyof T]-?: T[P] };
        例子：
            interface Person{
                name:string;
                age:number;
                gender?:'male'|'female';
            }

            let p:Required<Person> = {
                name:'zhufeng',
                age:10,
                //gender:'male' // 这里会报错，gender必填！！！
            }
    ·ReadOnly<T> 通过为传入的属性每一项都加上 readonly 修饰符来实现
        源码：
            type Readonly<T> = { readonly [P in keyof T]: T[P] };
    ·Pick<T, K extends keyof T>  能够帮助我们从传入的属性中摘取某一项返回
        源码：
            type Pick<T, K extends keyof T> = { [P in K]: T[P] }
        例子：
            interface Person {
                name: string;
                age: number;
                married: boolean
            }
            let person: Person = { name: 'zhufeng', age: 10, married: true };
            type P = Pick<Person, 'name' | 'age'> // { name: string; age: number }
    ·Record 将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
        源码：
            // 注意：keyof any ==》 string | number | Symbol
            type Record<K extends keyof any, T> = {
                [P in K]: T;
            };
        例子：
            interface Person {
                name: string;
                age: number;
                married: boolean
            }
            type A = Record<string, string>
            let eg: A = {
                name: '战三',
                age: 22, // 报错，不能将类型“number”分配给类型“string”。
                married: 1 // 报错，不能将类型“number”分配给类型“string”。
            }
七、模块与命名空间(了解)
    命名空间主要解决命名变量的冲突而创造的，用的很少
    namespace A {
        export class Dog {    //需要暴露才能使用

        }
    }
    namespace B {
        export class Dog {

        }
    }
    let a = new A.Dog();
    let b = new B.Dog();
    --------------------
    我们来看下命名空间的原理：
        其实一个命名空间本质上一个对象，它的作用是将一系列相关的全局变量组织到一个对象的属性
        namespace Numbers {
            export let a = 1;
            export let b = 2;
            export let c = 3;
        }
        它将会编译成↓
        var Numbers;
        (function (Numbers) {
            Numbers.a = 1;
            Numbers.b = 2;
            Numbers.c = 3;
        })(Numbers || (Numbers = {}));
八、类型声明
    ·介绍
        声明文件可以让我们不需要将js重构为ts。只需要加上声明文件就可以使用的系统
        类型声明在编译的时候会删除，不会影响源代码
    ·声明文件怎么写？
        declare const $: (select: string) => {
            click():any;
            width(length: string): void
        }
        $('#root').click();
    ·(.d.ts)文件声明
        ①、我们需要在tsconfig.json中修改配置项
            {
                "include": [
                    "src\/**\/*",
                    "typings\/**\/*"
                ]
            }
        ②、根目录新建一个文件夹typings,并创建一个demo.d.ts文件
            declare global{
                interface String {
                    double():string;
                }
                interface Window{
                    myname:string
                }
            }
九、三斜线指令
    ·介绍
        三斜线引用告诉编译器在编译过程中要引入的额外的文件。
    ·用途
        ·倒入声明文件
        ·倒入第三方包

        如果对比 import 的功能，我们可以写出如下的等式：
        /// <reference path="..." /> == import filename.xxx
        /// <reference types="..." /> == import lodash from "lodash"
    详情请参考：
        官网：https://www.tslang.cn/docs/handbook/triple-slash-directives.html
        博客：https://www.jianshu.com/p/e0912df68c3e
























*/