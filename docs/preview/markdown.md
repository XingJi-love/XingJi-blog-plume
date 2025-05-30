---
title: Markdown语法
tags:
  - markdown
createTime: 2025/03/28 23:12:11
permalink: /article/lv7hy5n7/
cover: /images/壁纸.jpg
---

## 标题H2

### 标题H3

#### 标题H4

##### 标题H5

###### 标题H6

## 标题2 Badge <Badge type="tip" text="Badge" />

### 标题3 Badge <Badge type="warning" text="Badge" />

#### 标题4 Badge <Badge type="danger" text="Badge" />

正文内容。

`@property` CSS at-rule是 [CSS Houdini API](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Houdini)
的一部分，它允许开发者显式地定义他们的 [CSS 自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*),
允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

`@property` 的出现，极大的增强了 CSS 的能力。

加粗：**加粗文字**

斜体： _斜体文字_

~~删除文字~~

内容 ==标记==

数学表达式： $-(2^{n-1})$ ~ $2^{n-1} -1$

$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}$

19^th^

H~2~O

::: center
内容居中
:::

::: right
内容右对齐
:::

- 无序列表1
- 无序列表2
- 无序列表3

1. 有序列表1
2. 有序列表2
3. 有序列表3

- [ ] 任务列表1
- [ ] 任务列表2
- [x] 任务列表3
- [x] 任务列表4

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

> 引用内容
>
> 引用内容

[链接](/)

[外部链接](https://github.com/pengzhanbo)

![plume](/plume.svg)

**Badge：**

- <Badge type="info" text="info badge" />
- <Badge type="tip" text="tip badge" />
- <Badge type="warning" text="warning badge" />
- <Badge type="danger" text="danger badge" />

**图标：**

- home - <Icon name="material-symbols:home" color="currentColor" size="1em" />
- vscode - <Icon name="skill-icons:vscode-dark" size="2em" />
- twitter - <Icon name="skill-icons:twitter" size="2em" />

**demo wrapper：**

::: demo-wrapper title="示例" no-padding height="200px"
<style scoped>
.open-door {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.open-door .main {
  background: #ccc;
}
</style>

<div class="open-door">
  <div class="main">main</div>
  <div class="aside">aside</div>
</div>

:::

**代码：**

```js whitespace
const a = 1
const b = 2
const c = a + b

// [!code word:obj]
const obj = {
  toLong: {
    deep: {
      deep: {
        deep: {
          value: 'this is to long text. this is to long text. this is to long text. this is to long text.', // [!code highlight]
        }
      }
    }
  }
}
```

**Code Blocks TwoSlash：**

```ts twoslash
// @errors: 2339
const welcome = 'Tudo bem gente?'
const words = welcome.contains(' ')
```

```ts twoslash
import express from 'express'
const app = express()
app.get('/', (req, res) => {
  res.send
})
app.listen(3000)
```

```ts twoslash
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({ themes: ['nord'], langs: ['javascript'] })
// @log: Custom log message
const a = 1
// @error: Custom error message
const b = 1
// @warn: Custom warning message
const c = 1
// @annotate: Custom annotation message
```

```ts twoslash
// @errors: 2540
interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users'.toUpperCase(),
//  ^?
}

todo.title = 'Hello'

Number.parseInt('123', 10)
//      ^|

//
//
```

```vue twoslash
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <p>{{ count }}</p>
</template>
```

**代码分组：**

::: code-tabs
@tab tab1

```js
const a = 1
const b = 2
const c = a + b
```

@tab tab2

```ts
const a: number = 1
const b: number = 2
const c: number = a + b
```

:::

**代码块高亮：**

```ts
function foo() {
  const a = 1 // [!code highlight]

  console.log(a)

  const b = 2 // [!code ++]
  const c = 3 // [!code --]

  console.log(a + b + c) // [!code error]
  console.log(a + b) // [!code warning]
}
```

**代码块聚焦：**

```ts
function foo() {
  const a = 1 // [!code focus]
}
```

::: tip 仅标题
:::

::: note 注释
注释内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: info 信息
信息内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: tip 提示
提示内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: warning 警告
警告内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: caution 错误
错误内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: important 重要
重要内容 [link](https://github.com/pengzhanbo) `inline code`

```js
const a = 1
const b = 2
const c = a + b
```

:::

::: details 详细标题

这里是内容。
:::

**GFM alert：**

> [!note]
> note

> [!info]
> info

> [!tip]
> tip

> [!warning]
> warning

> [!caution]
> caution

> [!important]
> important

**代码演示：**

:::: demo title="常规示例" desc="一个常规示例"

::: code-tabs
@tab HTML

```html
<div id="app">
  <h3>vuepress-theme-plume</h3>
</div>
```

@tab Javascript

```js
const a = 'So Awesome!'
const app = document.querySelector('#app')
app.appendChild(window.document.createElement('small')).textContent = a
```

@tab CSS

```css
#app {
  font-size: 2em;
  text-align: center;
}
```

:::
::::

**选项卡：**

::: tabs
@tab 标题1
内容区块

@tab 标题2
内容区块
:::

:::: warning
::: tabs
@tab 标题1
内容区块

@tab 标题2
内容区块
:::
::::

**脚注：**

脚注 1 链接[^first]。

脚注 2 链接[^second]。

行内的脚注^[行内脚注文本] 定义。

重复的页脚定义[^second]。

[^first]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^second]: 脚注文字。

## Markdown 扩展语法

### 图标

github: ::tdesign:logo-github-filled::
修改颜色：::tdesign:logo-github-filled /#f00::
修改大小：::tdesign:logo-github-filled =36px::
修改大小颜色：::tdesign:logo-github-filled =36px /#f00::

彩色图标 ::skill-icons:vscode-dark =36px::


### 马克笔

==一个提示=={.tip} ==一个警告=={.warning} ==一个错误=={.danger} ==重要内容=={.important}


### 隐秘文本

你知道吗， !!鲁迅!! 曾说过：“ !!我没说过这句话！!! ” 令我醍醐灌顶，深受启发，浑身迸发出无可匹敌的
力量！于是，!!我在床上翻了个身!! ！


### 缩写词

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium


### 内容注释

站点由 VuePress [+vuepress] 驱动。

[+vuepress]:
  VuePress 是一个 [静态站点生成器](https://en.wikipedia.org/wiki/Static_site_generator) (SSG) 。
  专为构建快速、以内容为中心的站点而设计。

中国古代 **四大名著** [+名著] 家喻户晓。

[+名著]:
  **《三国演义》：**

  以三国时期的历史为背景，描写了魏、蜀、吴三国之间的政治、军事斗争，塑造了诸葛亮、曹操、关羽、刘备等众多历史人物形象。

[+名著]:
  **《西游记》：**

  讲述了唐僧师徒四人（孙悟空、猪八戒、沙僧、白龙马）西天取经的故事，充满了神话色彩和奇幻冒险。

[+名著]:
  **《红楼梦》：**

  以贾、史、王、薛四大家族的兴衰为背景，描写了贾宝玉、林黛玉、薛宝钗等人的爱情悲剧，展现了封建社会的腐朽与没落。

[+名著]:
  **《水浒传》：**

  描写了北宋末年以宋江为首的108位好汉在梁山泊聚义，反抗朝廷的故事，展现了官逼民反的社会现实。


### 卡片

::: card title="卡片标题" icon="twemoji:astonished-face"

这里是卡片内容。
:::

:::: card-grid
::: card title="卡片标题 1" icon="twemoji:astonished-face"

这里是卡片内容。
:::

::: card title="卡片标题 2" icon="twemoji:astonished-face"

这里是卡片内容。
:::
::::


### 步骤

:::: steps
1. 步骤 1

   ```ts
   console.log('Hello World!')
   ```

2. 步骤 2

   这里是步骤 2 的相关内容

3. 步骤 3

   ::: tip
   提示容器
   :::

4. 结束
::::


### 文件树

::: file-tree

- docs
  - .vuepress
    - config.ts
  - page1.md
  - README.md
- theme  一个 **主题** 目录
  - client
    - components
      - **Navbar.vue**
    - composables
      - useNavbar.ts
    - styles
      - navbar.css
    - config.ts
  - node/
- package.json
- pnpm-lock.yaml
- .gitignore
- README.md
- …
:::


::: file-tree icon="simple"
- docs
  - .vuepress
    - config.ts
  - page1.md
  - README.md
- package.json
:::


### 选项组

::: tabs
@tab npm

npm 应该与 Node.js 被一同安装。

@tab pnpm

```sh
corepack enable
corepack use pnpm@8
```

:::


### 时间线

::: timeline
- 节点一
  time=2025-03-20 type=success

  正文内容

- 节点二
  time=2025-02-21 type=warning

  正文内容

- 节点三
  time=2025-01-22 type=danger

  正文内容
:::

::: timeline horizontal
- 节点一
  time=2025-03-20

  正文内容

- 节点二
  time=2025-04-20 type=success

  正文内容

- 节点三
  time=2025-01-22 type=danger

  正文内容

- 节点四
  time=2025-01-22 type=important

  正文内容
:::

::: timeline placement="right"
- 节点一
  time=2025-03-20

  正文内容

- 节点二
  time=2025-04-20 type=success

  正文内容

- 节点三
  time=2025-01-22 type=danger

  正文内容

- 节点四
  time=2025-01-22 type=important

  正文内容
:::

::: timeline placement="between"
- 节点一
  time=2025-03-20 placement=right

  正文内容

- 节点二
  time=2025-04-20 type=success

  正文内容

- 节点三
  time=2025-01-22 type=danger placement=right

  正文内容

- 节点四
  time=2025-01-22 type=important

  正文内容
:::

::: timeline line="dotted"
- 节点一
  time=2025-03-20

  正文内容

- 节点二
  time=2025-04-20 type=success

  正文内容

- 节点三
  time=2025-01-22 type=danger line=dashed

  正文内容

- 节点四
  time=2025-01-22 type=important line=solid

  正文内容
:::

::: timeline placement="between"
- 节点一
  time=2025-03-20 placement=right icon=mdi:balloon

  正文内容

- 节点二
  time=2025-04-20 type=success icon=mdi:bookmark

  正文内容

- 节点三
  time=2025-01-22 type=danger placement=right icon=mdi:bullhorn-variant-outline

  正文内容

- 节点四
  time=2025-01-22 type=important card=true icon="mdi:cake-variant-outline"

  正文内容
:::

::: timeline card
- 节点一
  time=2025-03-20

  正文内容

- 节点二
  time=2025-04-20 type=success card=false

  正文内容

- 节点三
  time=2025-01-22 type=danger

  正文内容

- 节点四
  time=2025-01-22 type=important

  正文内容
:::

### 示例容器
::: demo-wrapper img no-padding
![hero](/images/hello.png)  
:::

::: demo-wrapper title="标题"
//### 三级标题

这是示例容器中的内容。
:::

::: demo-wrapper
<h1 class="your-demo-title">这是标题</h1>
<p class="your-demo-paragraph">这是段落</p>

<style>
  .your-demo-title {
    color: red;
  }
  .your-demo-paragraph {
    color: blue;
  }
</style>
:::

### 折叠面板

::: collapse
- 标题 1

  正文内容

- 标题 2

  正文内容
:::


::: collapse expand
- 标题 1

  正文内容

- 标题 2

  正文内容
:::


::: collapse accordion
- 标题 1

  正文内容

- 标题 2

  正文内容

- 标题 3

  正文内容
:::


::: collapse
- 标题 1

  正文内容

- :+ 标题 2

  正文内容

- :+ 标题 3

  正文内容
:::


::: collapse expand
- 标题 1

  正文内容

- :- 标题 2

  正文内容

- 标题 3

  正文内容
:::


### npmTo 容器

::: code-tabs
@tab pnpm
``` sh
pnpm add -D vuepress vuepress-theme-plume
```
@tab yarn
``` sh
yarn add -D vuepress vuepress-theme-plume
```
@tab npm
``` sh
npm install -D vuepress vuepress-theme-plume
```
:::

::: npm-to tabs="npm,yarn,pnpm,bun,deno"
``` sh
npm install -D vuepress vuepress-theme-plume
```
:::

::: npm-to
```sh
npm install && npm run docs:dev
```
:::

::: npm-to
```sh
npm i -D vue
npm i --save-peer vuepress
npm i typescript
```
:::

::: npm-to
```sh
npm run docs:dev -- --clean-cache
```
:::

::: npm-to tabs="pnpm,yarn,npm,bun,deno"
```sh
npm ci
```
:::

### Can I Use

@[caniuse](css-matches-pseudo)

@[caniuse image](css-matches-pseudo)

@[caniuse{-2,3}](css-matches-pseudo)


## 代码块高亮

::: code-tabs
@tab C

``` c
#include <stdio.h>

#define ARR_LEN 7

void qsort(int v[], int left, int right);
void printArr(int v[], int len);

int main()
{
	int i;
	int v[ARR_LEN] = { 4, 3, 1, 7, 9, 6, 2 };
	printArr(v, ARR_LEN);
	qsort(v, 0, ARR_LEN-1);
	printArr(v, ARR_LEN);
	return 0;
}

void qsort(int v[], int left, int right)
{
	int i, last;
	void swap(int v[], int i, int j);

	if (left >= right)
		return;
	swap(v, left, (left + right) / 2);
	last = left;
	for (i = left+1; i <= right; i++)
		if (v[i] < v[left])
			swap(v, ++last, i);
	swap(v, left, last);
	qsort(v, left, last-1);
	qsort(v, last+1, right);
}

void swap(int v[], int i, int j)
{
	int temp;

	temp = v[i];
	v[i] = v[j];
	v[j] = temp;
}

void printArr(int v[], int len)
{
	int i;
	for (i = 0; i < len; i++)
		printf("%d ", v[i]);
	printf("\n");
}
```

@tab C++

```c++
// Working of implicit type-conversion

#include <iostream>
using namespace std;

int main() {

   int num_int;
   double num_double = 9.99;

   // implicit conversion
   // assigning a double value to an int variable
   num_int = num_double;

   cout << "num_int = " << num_int << endl;
   cout << "num_double = " << num_double << endl;

   return 0;
}
```

@tab Java

```java
import java.awt.Rectangle;

public class ObjectVarsAsParameters
{	public static void main(String[] args)
	{	go();
	}

	public static void go()
	{	Rectangle r1 = new Rectangle(0,0,5,5);
		System.out.println("In method go. r1 " + r1 + "\n");
		// could have been
		//System.out.prinltn("r1" + r1.toString());
		r1.setSize(10, 15);
		System.out.println("In method go. r1 " + r1 + "\n");
		alterPointee(r1);
		System.out.println("In method go. r1 " + r1 + "\n");

		alterPointer(r1);
		System.out.println("In method go. r1 " + r1 + "\n");
	}

	public static void alterPointee(Rectangle r)
	{	System.out.println("In method alterPointee. r " + r + "\n");
		r.setSize(20, 30);
		System.out.println("In method alterPointee. r " + r + "\n");
	}

	public static void alterPointer(Rectangle r)
	{	System.out.println("In method alterPointer. r " + r + "\n");
		r = new Rectangle(5, 10, 30, 35);
		System.out.println("In method alterPointer. r " + r + "\n");
	}

}
```

@tab Kotlin

```kotlin
package com.example.kotlin

import java.util.Random as Rand
import android.support.v7.app.AppCompatActivity
import org.amshove.kluent.`should equal` as Type

fun main(@NonNull args: Array<String>) {
    println("Hello Kotlin! ${/*test*/}")

    val map = mutableMapOf("A" to "B")

    thing.apply("random string here \n\t\r")
    thing.let { test: ->    }

    val string = "${getThing()}"
}

val items = listOf("apple", "banana", "kiwifruit")
var x = 9
const val CONSTANT = 99

@get:Rule
val activityRule = ActivityTestRule(SplashActivity::class.java)

val oneMillion = 1_000_000
val creditCardNumber = 1234_5678_9012_3456L
val socialSecurityNumber = 999_99_9999L
val hexBytes = 0xFF_EC_DE_5E
val float = 0.043_331F
val bytes = 0b11010010_01101001_10010100_10010010

if(test == "") {
    1 and 2 not 3
} else {

}

fun <T> foo() {
    val x  = Bar::class
    val y = hello?.test
}

suspend fun <T, U> SequenceBuilder<Int>.yieldIfOdd(x: Int) {
    if (x % 2 != 0) yield(x)
}

val function = fun(@Inject x: Int, y: Int, lamda: (A, B) -> Unit): Int {
    test.test()
    return x + y;
}

abstract fun onCreate(savedInstanceState: Bundle?)

fun isOdd(x: Int) = x % 2 != 0
fun isOdd(s: String) = s == "brillig" || s == "slithy" || s == "tove"

val numbers = listOf(1, 2, 3)
println(numbers.filter(::isOdd))

fun foo(node: Node?): String? {
    val parent = node.getParent() ?: return null
}

interface Greetable {
    fun greet()
}

open class Greeter: Greetable {
    companion object {
        private const val GREETING = "Hello, World!"
    }

    override fun greet() {
        println(GREETING)
    }
}

expect class Foo(bar: String) {
    fun frob()
}

actual class Foo actual constructor(val bar: String) {
    actual fun frob() {
        println("Frobbing the $bar")
    }
}

expect fun formatString(source: String, vararg args: Any): String
expect annotation class Test

actual fun formatString(source: String, vararg args: Any) = String.format(source, args)
actual typealias Test = org.junit.Test

sealed class Expr
data class Const(val number: Double) : Expr()
data class Sum(val e1: Expr, val e2: Expr) : Expr()
object NotANumber : Expr()

@file:JvmName("Foo")
private sealed class InjectedClass<T, U> @Inject constructor(
    val test: Int = 50,
    var anotherVar: String = "hello world"
) : SomeSuperClass(test, anotherVar) {

    init {
        //
    }

    constructor(param1: String, param2: Int): this(param1, param2) {
        //
    }

    companion object {
        //
    }
}
annotation class Suspendable
val f = @Suspendable { Fiber.sleep(10) }

private data class Foo(
    /**
     * ```
     * ($)
     * ```
     */
    val variables: Map<String, String>
)

data class Response(@SerializedName("param1") val param1: String,
                    @SerializedName("param2") val param2: String,
                    @SerializedName("param3") val param3: String) {
}

object DefaultListener : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) { }

    override fun mouseEntered(e: MouseEvent) { }
}

class Feature : Node("Title", "Content", "Description") {

}

class Outer {
    inner class Inner {}
}
```

@tab Python

```py
def fib(n):    # write Fibonacci series up to n
    """Print a Fibonacci series up to n."""
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

# Now call the function we just defined:
fib(2000)
```

@tab Go

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

@tab Ruby

```ruby
class LotteryTicket

  NUMERIC_RANGE = 1..25

  attr_reader :picks, :purchased

  def initialize( *picks )
    if picks.length != 3
      raise ArgumentError, "three numbers must be picked"
    elsif picks.uniq.length != 3
      raise ArgumentError, "the three picks must be different numbers"
    elsif picks.detect { |p| not NUMERIC_RANGE === p }
      raise ArgumentError, "the three picks must be numbers between 1 and 25"
    end
    @picks = picks
    @purchased = Time.now
  end

end
```

@tab Makefile

```make
edit : main.o kbd.o command.o display.o \
       insert.o search.o files.o utils.o
        cc -o edit main.o kbd.o command.o display.o \
                   insert.o search.o files.o utils.o

main.o : main.c defs.h
        cc -c main.c
kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
command.o : command.c defs.h command.h
        cc -c command.c
display.o : display.c defs.h buffer.h
        cc -c display.c
insert.o : insert.c defs.h buffer.h
        cc -c insert.c
search.o : search.c defs.h buffer.h
        cc -c search.c
files.o : files.c defs.h buffer.h command.h
        cc -c files.c
utils.o : utils.c defs.h
        cc -c utils.c
clean :
        rm edit main.o kbd.o command.o display.o \
           insert.o search.o files.o utils.o
```

@tab Object-C

```objc
@interface classname : superclassname {
  // instance variables
}
+ classMethod1;
+ (return_type)classMethod2;
+ (return_type)classMethod3:(param1_type)param1_varName;

- (return_type)instanceMethod1With1Parameter:(param1_type)param1_varName;
- (return_type)instanceMethod2With2Parameters:(param1_type)param1_varName
                              param2_callName:(param2_type)param2_varName;
@end
```

@tab Swift

```swift
class Residence {
    var rooms: [Room] = []
    var numberOfRooms: Int {
        return rooms.count
    }
    subscript(i: Int) -> Room {
        get {
            return rooms[i]
        }
        set {
            rooms[i] = newValue
        }
    }
    func printNumberOfRooms() {
        print("The number of rooms is \(numberOfRooms)")
    }
    var address: Address?
}
```

@tab PHP

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
```

@tab Rust

```rs
// Unlike C/C++, there's no restriction on the order of function definitions
fn main() {
    // We can use this function here, and define it somewhere later
    fizzbuzz_to(100);
}

// Function that returns a boolean value
fn is_divisible_by(lhs: u32, rhs: u32) -> bool {
    // Corner case, early return
    if rhs == 0 {
        return false;
    }

    // This is an expression, the `return` keyword is not necessary here
    lhs % rhs == 0
}

// Functions that "don't" return a value, actually return the unit type `()`
fn fizzbuzz(n: u32) -> () {
    if is_divisible_by(n, 15) {
        println!("fizzbuzz");
    } else if is_divisible_by(n, 3) {
        println!("fizz");
    } else if is_divisible_by(n, 5) {
        println!("buzz");
    } else {
        println!("{}", n);
    }
}

// When a function returns `()`, the return type can be omitted from the
// signature
fn fizzbuzz_to(n: u32) {
    for n in 1..=n {
        fizzbuzz(n);
    }
}
```

@tab SQL

```sql
USE AdventureWorks2022;
GO
IF OBJECT_ID('dbo.NewProducts', 'U') IS NOT NULL
    DROP TABLE dbo.NewProducts;
GO
ALTER DATABASE AdventureWorks2022 SET RECOVERY BULK_LOGGED;
GO

SELECT * INTO dbo.NewProducts
FROM Production.Product
WHERE ListPrice > $25
AND ListPrice < $100;
GO
ALTER DATABASE AdventureWorks2022 SET RECOVERY FULL;
GO
```

@tab XML

```xml
<?xml version="1.0"?>
<catalog>
   <book id="bk101">
      <author>Gambardella, Matthew</author>
      <title>XML Developer's Guide</title>
      <genre>Computer</genre>
      <price>44.95</price>
      <publish_date>2000-10-01</publish_date>
      <description>An in-depth look at creating applications
      with XML.</description>
   </book>
   <book id="bk102">
      <author>Ralls, Kim</author>
      <title>Midnight Rain</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-12-16</publish_date>
      <description>A former architect battles corporate zombies,
      an evil sorceress, and her own childhood to become queen
      of the world.</description>
   </book>
   <book id="bk103">
      <author>Corets, Eva</author>
      <title>Maeve Ascendant</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2000-11-17</publish_date>
      <description>After the collapse of a nanotechnology
      society in England, the young survivors lay the
      foundation for a new society.</description>
   </book>
   <book id="bk104">
      <author>Corets, Eva</author>
      <title>Oberon's Legacy</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2001-03-10</publish_date>
      <description>In post-apocalypse England, the mysterious
      agent known only as Oberon helps to create a new life
      for the inhabitants of London. Sequel to Maeve
      Ascendant.</description>
   </book>
   <book id="bk105">
      <author>Corets, Eva</author>
      <title>The Sundered Grail</title>
      <genre>Fantasy</genre>
      <price>5.95</price>
      <publish_date>2001-09-10</publish_date>
      <description>The two daughters of Maeve, half-sisters,
      battle one another for control of England. Sequel to
      Oberon's Legacy.</description>
   </book>
   <book id="bk106">
      <author>Randall, Cynthia</author>
      <title>Lover Birds</title>
      <genre>Romance</genre>
      <price>4.95</price>
      <publish_date>2000-09-02</publish_date>
      <description>When Carla meets Paul at an ornithology
      conference, tempers fly as feathers get ruffled.</description>
   </book>
   <book id="bk107">
      <author>Thurman, Paula</author>
      <title>Splish Splash</title>
      <genre>Romance</genre>
      <price>4.95</price>
      <publish_date>2000-11-02</publish_date>
      <description>A deep sea diver finds true love twenty
      thousand leagues beneath the sea.</description>
   </book>
   <book id="bk108">
      <author>Knorr, Stefan</author>
      <title>Creepy Crawlies</title>
      <genre>Horror</genre>
      <price>4.95</price>
      <publish_date>2000-12-06</publish_date>
      <description>An anthology of horror stories about roaches,
      centipedes, scorpions  and other insects.</description>
   </book>
   <book id="bk109">
      <author>Kress, Peter</author>
      <title>Paradox Lost</title>
      <genre>Science Fiction</genre>
      <price>6.95</price>
      <publish_date>2000-11-02</publish_date>
      <description>After an inadvertant trip through a Heisenberg
      Uncertainty Device, James Salway discovers the problems
      of being quantum.</description>
   </book>
   <book id="bk110">
      <author>O'Brien, Tim</author>
      <title>Microsoft .NET: The Programming Bible</title>
      <genre>Computer</genre>
      <price>36.95</price>
      <publish_date>2000-12-09</publish_date>
      <description>Microsoft's .NET initiative is explored in
      detail in this deep programmer's reference.</description>
   </book>
   <book id="bk111">
      <author>O'Brien, Tim</author>
      <title>MSXML3: A Comprehensive Guide</title>
      <genre>Computer</genre>
      <price>36.95</price>
      <publish_date>2000-12-01</publish_date>
      <description>The Microsoft MSXML3 parser is covered in
      detail, with attention to XML DOM interfaces, XSLT processing,
      SAX and more.</description>
   </book>
   <book id="bk112">
      <author>Galos, Mike</author>
      <title>Visual Studio 7: A Comprehensive Guide</title>
      <genre>Computer</genre>
      <price>49.95</price>
      <publish_date>2001-04-16</publish_date>
      <description>Microsoft Visual Studio 7 is explored in depth,
      looking at how Visual Basic, Visual C++, C#, and ASP+ are
      integrated into a comprehensive development
      environment.</description>
   </book>
</catalog>
```

@tab Zig

```zig
const std = @import("std");
const parseInt = std.fmt.parseInt;

test "parse integers" {
    const input = "123 67 89,99";
    const ally = std.testing.allocator;

    var list = std.ArrayList(u32).init(ally);
    // Ensure the list is freed at scope exit.
    // Try commenting out this line!
    defer list.deinit();

    var it = std.mem.tokenize(u8, input, " ,");
    while (it.next()) |num| {
        const n = try parseInt(u32, num, 10);
        try list.append(n);
    }

    const expected = [_]u32{ 123, 67, 89, 99 };

    for (expected, list.items) |exp, actual| {
        try std.testing.expectEqual(exp, actual);
    }
}
```
:::

::: code-tabs
@tab HTML

``` html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>MDN Web Docs Example: Toggling full-screen mode</title>
    <link rel="stylesheet" href="styles.css">
    <style class="editable">
        video::backdrop {
          background-color: #448;
        }
    </style>

    <!-- import the webpage's javascript file -->
    <script src="script.js" defer></script>
  </head>
  <body>
    <section class="preview">
      <video controls
        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        width="620">

        Sorry, your browser doesn't support embedded videos.  Time to upgrade!

      </video>
    </section>

<textarea class="playable playable-css" style="height: 100px;">
video::backdrop {
  background-color: #448;
}
</textarea>

<textarea class="playable playable-html" style="height: 200px;">
<video controls
  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  width="620">
Sorry, your browser doesn't support embedded videos.  Time to upgrade!
</video>
</textarea>

    <div class="playable-buttons">
        <input id="reset" type="button" value="Reset" />
      </div>
    </body>
    <script src="playable.js"></script>
  </body>
</html>
```

@tab Pug

```pug
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5);
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

@tab HTTP

```http
// Basic authentication
GET http://example.com
Authorization: Basic username password

###

// Digest authentication
GET http://example.com
Authorization: Digest username password

// The request body is provided in place
POST https://example.com:8080/api/html/post HTTP/1.1
Content-Type: application/json
Cookie: key=first-value

{ "key" : "value", "list": [1, 2, 3] }
```

@tab CSS

```css
html {
	margin: 0;
	background: black;
	height: 100%;
}

body {
	margin: 0;
	width: 100%;
	height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
	float: left;
	width: 25%;
	height: 100%;
	object-fit: cover;
}

.main {
  display: none;
}

.blowup {
  display: block;
  position: absolute;
  object-fit: contain;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.darken {
  opacity: 0.4;
}
```

@tab Less

```less
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }

  &-custom {
    background-image: url("custom.png");
  }
}
.link {
  & + & {
    color: red;
  }

  & & {
    color: green;
  }

  && {
    color: blue;
  }

  &, &ish {
    color: cyan;
  }
}
```

@tab SCSS

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

@tab Stylus

```styl
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

border-radius()
  vendor('border-radius', arguments)

box-shadow()
  vendor('box-shadow', arguments)

button
  border-radius 1px 2px / 3px 4px

border-radius() {
  -webkit-border-radius: arguments;
  -moz-border-radius: arguments;
  border-radius: arguments;
}

body a {
  font: 12px/1.4 "Lucida Grande", Arial, sans-serif;
  background: black;
  color: #ccc;
}

form input {
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
}
```

@tab JavaScript

```js
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x)
    }, 2000)
  })
}

// async function expression assigned to a variable
const add = async function (x) {
  const a = await resolveAfter2Seconds(20)
  const b = await resolveAfter2Seconds(30)
  return x + a + b
}

add(10).then((v) => {
  console.log(v) // prints 60 after 4 seconds.
});

// async function expression used as an IIFE
(async function (x) {
  const p1 = resolveAfter2Seconds(20)
  const p2 = resolveAfter2Seconds(30)
  return x + (await p1) + (await p2)
})(10).then((v) => {
  console.log(v) // prints 60 after 2 seconds.
})
```

@tab JSX

```jsx
function Item({ name, isPacked }) {
  if (isPacked)
    return null

  return <li className="item">{name}</li>
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  )
}
```

@tab TypeScript

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key]
  if (num <= LogLevel.WARN) {
    console.log('Log level key is:', key)
    console.log('Log level value is:', num)
    console.log('Log level message is:', message)
  }
}
printImportant('ERROR', 'This is a message')
```

@tab TSX

```tsx
// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts
    }
  }
}

export default Blog
```

@tab Astro

```astro
---
// Your component script here!
import Banner from '../components/Banner.astro';
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
const { title } = Astro.props;
---
<!-- HTML comments supported! -->
{/* JS comment syntax is also valid! */}

<Banner />
<h1>Hello, world!</h1>

<!-- Use props and other variables from the component script: -->
<p>{title}</p>

<!-- Include other UI framework components with a `client:` directive to hydrate: -->
<ReactPokemonComponent client:visible />

<!-- Mix HTML with JavaScript expressions, similar to JSX: -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
</ul>

<!-- Use a template directive to build class names from multiple strings or even objects! -->
<p class:list={["add", "dynamic", {classNames: true}]} />
```

@tab Vue

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

function reverseMessage() {
  // Access/mutate the value of a ref via
  // its .value property.
  message.value = message.value.split('').reverse().join('')
}

function notify() {
  alert('navigation was prevented.')
}
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="reverseMessage">
    Reverse Message
  </button>
  <button @click="message += '!'">
    Append "!"
  </button>
  <a href="https://vuejs.org" @click.prevent="notify">
    A link with e.preventDefault()
  </a>
</template>

<style>
button, a {
  display: block;
  margin-bottom: 1em;
}
</style>
```

@tab Svelte

```svelte
<script>
	let files;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}
</script>

<label for="avatar">Upload a picture:</label>
<input accept="image/png, image/jpeg" bind:files id="avatar" name="avatar" type="file" />

<label for="many">Upload multiple files of any type:</label>
<input bind:files id="many" multiple type="file" />

{#if files}
	<h2>Selected files:</h2>
	{#each Array.from(files) as file}
		<p>{file.name} ({file.size} bytes)</p>
	{/each}
{/if}
```

@tab WebAssembly

```wasm
(module
	;; add the $even_check function to the top of the module
	(func $even_check (param $n i32) (result i32)
		local.get $n
		i32.const 2
		i32.rem_u ;; if you take the remainder of a division by 2
		i32.const 0 ;; even numbers will have a remainder 0
		i32.eq ;; $n % 2 == 0
	)
	;; add the $eq_2 function after $even_check
	(func $eq_2 (param $n i32) (result i32)
		local.get $n
		i32.const 2
		i32.eq ;; returns 1 if $n == 2
	)

	;; add $multiple_check after $eq_2
	(func $multiple_check (param $n i32) (param $m i32) (result i32)
		local.get $n
		local.get $m
		i32.rem_u ;; get the remainder of $n / $m
		i32.const 0 ;; I want to know if the remainder is 0
		i32.eq ;; that will tell us if $n is a multiple of $m
	)

	;; add the is_prime exported function after $multiple_check
	(func (export "is_prime") (param $n i32) (result i32)
		(local $i i32)
		(if (i32.eq (local.get $n) (i32.const 1)) ;; 1 is not prime
		(then
			i32.const 0
			return
		))
		(if (call $eq_2 (local.get $n)) ;; check to see if $n is 2
		(then
			i32.const 1 ;; 2 is prime
			return
		)
	)
	(block $not_prime
		(call $even_check (local.get $n))
		br_if $not_prime ;; even numbers are not prime (except 2)

		(local.set $i (i32.const 1))
		(loop $prime_test_loop

			(local.tee $i (i32.add (local.get $i) (i32.const 2) ) ) ;; $i += 2
			local.get $n ;; stack = [$n, $i]

			i32.ge_u ;; $i >= $n
			if ;; if $i >= $n, $n is prime
				i32.const 1
			return
			end
			(call $multiple_check (local.get $n) (local.get $i))
			br_if $not_prime ;; if $n is a multiple of $i this is not prime
			br $prime_test_loop ;; branch back to top of loop
			) ;; end of $prime_test_loop loop
		) ;; end of $not_prime block

i32.const 0 ;; return false
 )
) ;; end of module
```

:::


## 代码块标题

```json title="package.json"
{
  "name": "vuepress-theme-plume"
}
```

## 代码行号

```ts:line-numbers
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:no-line-numbers
// 行号已禁用
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

```ts:line-numbers=2
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```


## 代码分组

::: code-tabs
@tab config.js
```js
/**
 * @type {import('vuepress').UserConfig}
 */
const config = {
  // ..
}

export default config
```

@tab config.ts
```ts
import type { UserConfig } from 'vuepress'

const config: UserConfig = {
  // ..
}

export default config
```
:::

::: code-tabs
@tab config.js
```js
/**
 * @type {import('vuepress').UserConfig}
 */
const config = {
  // ..
}

export default config
```

@tab:active config.ts 
```ts
import type { UserConfig } from 'vuepress'

const config: UserConfig = {
  // ..
}

export default config
```
:::