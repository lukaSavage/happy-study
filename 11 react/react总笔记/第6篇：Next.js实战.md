# 一、浏览器的渲染模式

> 目前主流的渲染模式大致分为4大类：

* ‌ **客户端渲染（CSR, Client-Side Rendering）** ‌：服务器仅返回一个空的 HTML 骨架，页面内容由浏览器下载并执行 JavaScript 后动态生成。优点是前后端分离彻底、服务器负担轻，适合交互复杂的单页应用（SPA）；缺点是首屏加载慢、SEO 效果差。‌
* ‌ **服务器端渲染（SSR, Server-Side Rendering）** ‌：在服务器端完成页面的完整渲染，将生成的 HTML 直接返回给浏览器。优点是首屏加载快、SEO 友好，适合内容型网站如电商、博客；缺点是服务器压力较大，且需要维护 Node.js 中间层。‌**1**2
* ‌ **静态站点生成（SSG, Static Site Generation）** ‌：在构建阶段（如执行 `npm run build`）就预先生成所有页面的静态 HTML 文件，部署时直接提供这些文件。优点是性能极佳、成本低、安全性高；缺点是无法处理动态内容，适合内容更新频率低的网站。‌
* ‌ **增量静态再生（ISR, Incremental Static Regeneration）** ‌：结合了 SSG 和 SSR 的优势，允许在部署后按需或定时重新生成特定页面，而无需重建整个站点。它在保持静态性能的同时，支持动态内容更新，适用于内容频繁变化但又希望保持高性能的网站（如新闻门户）。‌
* ‌ **混合渲染（Hybrid Rendering）** ‌：在同一个项目中混合使用多种渲染模式，例如对首页使用 SSR，对用户个人中心使用 CSR，或在组件级别实现“孤岛架构”（Island Architecture）。这种模式灵活性高，能针对不同页面或组件优化体验，是现代框架（如 Next.js、Nuxt.js）的推荐实践。‌

# 二、Next的渲染原理

> Next.js 是一个基于 React 的框架，它提供了静态站点生成（Static Site Generation, SSG）、服务器端渲染（Server-Side Rendering, SSR）和客户端渲染（Client-Side Rendering, CSR）等多种渲染模式。理解 Next.js 的渲染过程对于开发高效、可扩展的 web 应用至关重要。以下是 Next.js 的主要渲染流程概述：

### 2.1 静态站点生成（SSG）

‌**静态站点生成**‌是 Next.js 的一个核心特性，它允许你在构建时预先渲染页面。这对于内容不经常变化的网站非常有用，因为它可以显著提高性能和安全性。

‌ **工作流程：** ‌

* ‌**页面组件**‌：在 `pages` 目录下创建 React 组件，例如 `pages/index.js`。
* ‌**数据获取**‌：在页面的 `getStaticProps` 函数中获取数据。这个函数在构建时调用，并将数据作为 props 传递给组件。
* ‌**生成页面**‌：Next.js 在**构建阶段**为每个页面调用 `getStaticProps`，然后使用这些数据生成 HTML 文件。
* ‌**部署**‌：生成的 HTML 文件可以直接部署到 CDN 或任何静态文件服务器。

SSG是App Router默认渲染方式，只要组件不依赖动态数据（或依赖静态数据），构建时就会生成静态HTML。

```tsx
// src/app/static-page/page.tsx（SSG页面）
// 无需额外配置，默认就是SSG
export default function StaticPage() {
  // 静态数据（构建时就确定，不会变化）
  const staticData = {
    title: "Next.js SSG 静态页面",
    desc: "构建时生成HTML，部署后直接返回，速度超快！",
    updateTime: "2024-01-01" // 静态内容，不会实时更新
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{staticData.title}</h1>
      <p className="text-gray-600 mb-3">{staticData.desc}</p>
      <p className="text-gray-500">最后更新：{staticData.updateTime}</p>
    </div>
  );
}

```

### 2.2 服务器端渲染（SSR）

‌**服务器端渲染**‌使得每个页面请求时都可以动态生成页面内容。这对于需要根据请求动态生成内容的网站非常有用。

‌ **工作流程：** ‌

* ‌**页面组件**‌：与 SSG 类似，在 `pages` 目录下创建 React 组件。
* ‌**数据获取**‌：在页面的 `getServerSideProps` 函数中获取数据。这个函数在每次页面请求时调用，并将数据作为 props 传递给组件。
* ‌**页面渲染**‌：每次请求到达服务器时，服务器都会调用 `getServerSideProps` 来获取数据，然后使用这些数据渲染 HTML 并发送给客户端。

在Server Components中使用 `async/await` 获取动态数据，Next.js会自动识别为SSR（每次访问重新渲染）。

```tsx
// src/app/ssr-page/page.tsx（SSR页面）
// 服务器组件+async获取动态数据=SSR
export default async function SSRPage() {
  // 模拟实时请求接口（每次访问都会重新调用）
  const fetchDynamicData = async () => {
    // 实际项目中替换为真实API地址
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      cache: "no-store" // 关键：禁用缓存，每次访问重新请求
    });
    return res.json();
  };

  const dynamicData = await fetchDynamicData();

  // 实时时间（每次访问都会更新）
  const currentTime = new Date().toLocaleString();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Next.js SSR 动态页面</h1>
      <p className="text-gray-600 mb-3">当前时间：{currentTime}</p>
      <p className="text-gray-600 mb-3">动态内容：{dynamicData.title}</p>
      <p className="text-gray-500">刷新页面会更新时间和数据</p>
    </div>
  );
}

```

关键说明：

* `cache: "no-store"` 是SSR的核心配置，告诉Next.js“不缓存数据，每次访问重新请求”；
* 无需标记 `'use client'`，服务器组件可直接用 `async/await` 获取数据；
* 效果验证：刷新页面，当前时间会实时变化，证明每次访问都在服务器重新渲染。

### 2.3 客户端渲染（CSR）

虽然 Next.js 主要支持 SSG 和 SSR，但你也可以通过不使用 `getStaticProps` 或 `getServerSideProps` 来实现客户端渲染。在这种情况下，React 组件将在客户端加载后进行初始渲染。

‌ **工作流程：** ‌

* ‌**页面组件**‌：在 `pages` 目录下创建 React 组件。
* ‌**无数据获取**‌：不使用 `getStaticProps` 或 `getServerSideProps`。
* ‌**客户端渲染**‌：首次加载时，Next.js 将加载 JavaScript 包和必要的代码，然后在客户端进行初始渲染。

必须标记 `'use client'`（声明为客户端组件），再用 `useEffect` 或SWR/React Query获取数据。

```tsx
// src/app/csr-page/page.tsx（CSR页面）
'use client' // 关键：标记为客户端组件
import { useState, useEffect } from "react";

export default function CSRPage() {
  const [clientData, setClientData] = useState("");
  const [loading, setLoading] = useState(true);

  // 客户端获取数据（浏览器中执行）
  useEffect(() => {
    const fetchClientData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/3");
      const data = await res.json();
      setClientData(data.title);
      setLoading(false);
    };

    fetchClientData();
  }, []);

  if (loading) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Next.js CSR 客户端页面</h1>
      <p className="text-gray-600 mb-3">客户端渲染内容：{clientData}</p>
      <p className="text-gray-500">依赖浏览器执行，查看源代码看不到内容（SEO差）</p>
    </div>
  );
}

```

### 2.4 增量静态再生（ISR）

Next.js 13 引入了增量静态再生成（Incremental Static Regeneration, ISR），它结合了 SSG 和 SSR 的优点。你可以为某些页面启用 ISR，这样这些页面既可以静态生成，也可以在需要时动态更新。

‌ **工作流程：** ‌

* ‌**页面组件**‌：与 SSG 和 SSR 类似，创建 React 组件。
* ‌**数据获取**‌：使用 `getStaticProps` 或 `getServerSideProps` 获取数据。
* ‌**动态更新**‌：对于支持 ISR 的页面，当数据更新时，可以重新生成或更新静态页面，而不需要每次都重新生成整个网站。

通过 `revalidate` 配置重新验证时间（单位：秒），支持页面级和路由段级配置。

```tsx
// src/app/isr-page/page.tsx（ISR页面）
export default async function ISRPage() {
  // 模拟请求数据，会被缓存revalidate秒
  const fetchDataWithISR = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/2", {
      next: { revalidate: 60 } // 关键：60秒后重新验证数据
    });
    return res.json();
  };

  const isrData = await fetchDataWithISR();
  const buildTime = new Date().toLocaleString(); // 构建时的时间

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Next.js ISR 增量更新页面</h1>
      <p className="text-gray-600 mb-3">构建时间：{buildTime}</p>
      <p className="text-gray-600 mb-3">内容：{isrData.title}</p>
      <p className="text-gray-500">60秒内刷新页面用缓存，到期后自动更新</p>
    </div>
  );
}

```

关键说明

* next: { revalidate: 60 } 表示“缓存60秒，60秒后下次访问时，服务器会悄悄更新HTML”；
* 效果验证：
  1. 执行 npm run build 后启动 npm run start（生产模式）；
  2. 首次访问 /isr-page，记录构建时间；
  3. 60秒内刷新，时间不变；60秒后刷新，时间更新（证明页面已重新生成）。

### 总结：四大渲染方式对比

Next.js 通过这些不同的渲染模式提供了灵活性和性能优化。选择合适的渲染模式取决于你的具体需求，比如内容是否频繁更新、是否需要快速加载时间等。通过合理使用这些特性，你可以构建出高性能的 web 应用。

| 渲染方式 | 渲染时机        | 执行环境 | 性能（首屏） | SEO效果 | 核心优势             | 适用场景               |
| -------- | --------------- | -------- | ------------ | ------- | -------------------- | ---------------------- |
| SSG      | 构建时          | 服务器   | 最快         | 最好    | 部署后无服务器压力   | 静态内容（博客、官网） |
| SSR      | 每次访问时      | 服务器   | 中等         | 最好    | 内容实时更新         | 动态内容（电商列表）   |
| ISR      | 构建时+到期更新 | 服务器   | 接近SSG      | 最好    | 快且内容新鲜         | 半动态内容（商品详情） |
| CSR      | 浏览器加载后    | 浏览器   | 最慢         | 最差    | 交互性强、无需服务器 | 后台系统、个人中心     |

### 渲染方式选择指南（新手直接套用）

不用纠结“哪种最好”，按业务场景直接选：

* 页面需要被搜索引擎收录（如官网、博客、电商商品页）→ 优先选 SSG 或 ISR；
* 页面内容实时变化（如实时数据、用户专属内容）→ 选 SSR；
* 页面交互多、不需要SEO（如后台管理、聊天）→ 选 CSR；
* 流量大、内容更新频率低（如新闻列表）→ 选 ISR（兼顾速度和新鲜度）。

### 进阶技巧：同一页面混合渲染

Next.js支持“页面框架用SSG，动态内容用CSR”，比如博客首页框架静态生成，评论区用客户端渲染：

```tsx
// src/app/blog/page.tsx（混合渲染示例）
// 服务器组件（SSG生成页面框架）
import CommentSection from "./CommentSection"; // 客户端组件

export default function BlogPage() {
  // SSG：构建时生成静态内容
  const blogContent = "这是静态生成的博客正文...";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">混合渲染示例</h1>
      <p className="text-gray-600 mb-6">{blogContent}</p>
      {/* 客户端组件：CSR渲染评论区（交互性强） */}
      <CommentSection />
    </div>
  );
}

// src/app/blog/CommentSection.tsx（客户端组件）
'use client'
import { useState } from "react";

export default function CommentSection() {
  const [comments, setComments] = useState(["第一条评论"]);
  // 评论交互逻辑...
  return <div className="mt-6">评论区：{comments.map((c) => <p key={c}>{c}</p>)}</div>;
}

```

附：[梳理两种路由侠的不同渲染方式](https://cloud.tencent.com/developer/article/2321765 "参考文本")

## 常见问题排查（新手避坑）

1. 想做SSR但内容不更新？

   + 检查是否加了 cache: "no-store"，没加的话Next.js会默认缓存数据；
   + 确保组件是服务器组件（没加 'use client'），客户端组件无法实现SSR。
2. ISR页面没按预期更新？

   + 必须在生产模式（npm run build && npm run start）测试，开发模式（npm run dev）不会缓存；
   + 检查 revalidate 配置是否写在 fetch 的 next 选项中，位置不对无效。
3. 客户端组件报错“useState is not defined”？

   + 忘记加 'use client'，App Router默认是服务器组件，不支持客户端Hooks。
4. SSG页面想获取动态数据？

   - SSG只能获取“构建时已知的数据”，如果需要动态数据，改用ISR或SSR。

# 三、Next.js的水合

先说说背景，Next.js是个超级火的React框架，最大的卖点就是能轻松搞定**服务器端渲染（SSR）**和**静态站点生成（SSG）** 。为啥要整这些？简单来说，传统的React应用（也就是纯客户端渲染，CSR）是先把一个空壳HTML扔给浏览器，然后靠JavaScript在浏览器里把页面内容“画”出来。这虽然灵活，但有两个问题：

1. **首屏加载慢** ：用户得等JavaScript加载完、执行完，才能看到页面内容。
2. **SEO不友好** ：搜索引擎爬虫看到的是空HTML，抓不到啥有用的内容。

Next.js站出来说：“我来解决！”通过SSR或SSG，Next.js能在服务器上把页面渲染好，生成完整的HTML，直接发给浏览器。这样用户能秒看到内容，搜索引擎也能开心地抓到数据。听起来很美对吧？但这时候，JavaScript咋办？页面送过去是静态的HTML，咋让它“活”起来，响应用户的点击、输入啥的？这就得靠**水合**了！

## 3.1 水合的概念

“水合”这个词听起来像化学实验，其实在Next.js里，它是个很形象的说法。想象一下，服务器送来的HTML就像一块干巴巴的海绵，里面有页面的结构和内容，但它还不会“动”。水合就是把这块干海绵泡进水里，让它吸饱React的JavaScript“水分”，变成一个能互动的、活生生的React应用。

具体点说，水合是Next.js（或者React）在浏览器端把服务器渲染的静态HTML跟React组件“绑定”起来的过程。服务器送来的HTML是死的，React通过水合给它注入灵魂，让页面能响应用户操作，比如点击按钮、切换tab啥的。

## 3.2 水合咋干的？

1. **服务器干活** ：
   你用Next.js的 `getServerSideProps`（SSR）或者 `getStaticProps`（SSG）写页面逻辑，服务器会先把页面渲染成HTML。这HTML包含了页面的完整DOM结构和初始数据（比如从API拉来的列表数据）。这时候，Next.js还会把页面的初始状态（props）序列化成JSON，塞进一个叫 `__NEXT_DATA__`的script标签里，一起发给浏览器。
2. **浏览器接手** ：
   浏览器收到HTML后，先展示出来，用户立马能看到内容（这叫 **首屏渲染** ）。与此同时，Next.js的JavaScript（也就是React代码）开始加载。加载完后，React会干啥？它会读取 `__NEXT_DATA__`里的JSON数据，用来初始化React组件树。
3. **水合过程** ：
   React会把服务器送来的HTML结构跟自己的虚拟DOM对比一遍，确认没啥问题后，就把事件监听器（比如onClick、onChange）“挂”到对应的DOM节点上。这个过程就像给HTML装上“遥控器”，让它能响应用户的操作。完成之后，页面就从静态的HTML变成了一个动态的React应用。
4. **注意事项** ：
   水合有个关键点——服务器和客户端渲染的HTML必须一致。如果不一致（比如服务器少渲染了个div，或者客户端代码改了结构），React会报错，提示“水合失败”（hydration mismatch）。这也是开发Next.js时常踩的坑，后面会讲咋避免。

# 四、Next.js SSR 渲染过程

## 4.1. SSR 完整渲染流程

> 用户请求 → 服务器 → 数据获取 → 生成 HTML → 返回完整 HTML → 浏览器渲染 → JS 水合（Hydration）

## 4.2. 详细步骤

### 4.2.1 客户端处理

```tsx
// 页面示例：pages/dashboard.js
export async function getServerSideProps(context) {
  // 步骤1: 服务器端数据获取
  const data = await fetchAPI('/dashboard')
  
  // 步骤2: 返回 props 给组件
  return {
    props: { data }
  }
}

export default function Dashboard({ data }) {
  return (
    <div>
      <h1>仪表板</h1>
      {/* 步骤3: 组件在服务器渲染为 HTML */}
      <p>{data.title}</p>
    </div>
  )
}

```

小结一下当你通过next.js创建一个组件后，客户端执行了以下步骤↓

1. 页面通过 `getServersideProps`或者 `getStaticsProps`获取动态数据
2. 获取到的数据以props的方式返回给组件
3. 组件通过服务端渲染为字符串化的HTML

### 4.2.1 服务端处理

```tsx
// 服务器端伪代码流程
async function handleRequest(req, res) {
  // 1. 解析请求 URL，确定渲染哪个页面
  const pagePath = matchRoute(req.url)
  
  // 2. 调用 getServerSideProps 获取数据
  const props = await page.getServerSideProps({ req, res })
  
  // 3. 渲染 React 组件为 HTML
  const html = await renderToString(<page {...props} />)
  
  // 4. 生成完整的 HTML 文档
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Dashboard</title>
      </head>
      <body>
        <div id="__next">${html}</div>
        <script src="/_next/static/.../main.js"></script>
        <script id="__NEXT_DATA__" type="application/json">
          ${JSON.stringify({ props })}
        </script>
      </body>
    </html>
  `
  
  // 5. 返回给浏览器
  res.send(fullHtml)
}

```

小结下：服务端做了哪些事情

1. 解析请求 URL，确定渲染哪个页面
2. 调用 getServerSideProps 获取数据
3. 渲染 React 组件为 HTML
4. 生成完整的 HTML 文档

### 4.2.3 水合处理

```tsx
// 浏览器接收 HTML 后
// 1. 首次渲染：直接显示服务器返回的 HTML（立即可见）
// 2. 加载 JS：执行打包的 JavaScript
// 3. 水合：在现有 DOM 上附加事件监听器
// 4. 交互：页面完全可交互

// 水合过程
window.__NEXT_DATA__ = {
  props: { data: {...} }  // 从 __NEXT_DATA__ 获取数据
}

// React 水合
hydrate(
  <App pageProps={window.__NEXT_DATA__.props} />,
  document.getElementById('__next')
)

```

小结下：水合过程做了哪些事情

1. 首次渲染：直接显示服务器返回的 HTML（立即可见）
2. 加载 JS：执行打包的 JavaScript
3. 水合：在现有 DOM 上附加事件监听器
4. 生成完整的 HTML 文档

## 渲染模式对比

```tsx
// SSR 页面 - pages/dashboard.js
export async function getServerSideProps() {
  return { props: { data: '实时数据' } }
}
// 每次请求都在服务器渲染 HTML

// SSG 页面 - pages/index.js
export async function getStaticProps() {
  return { props: { data: '静态数据' } }
}
// 构建时生成 HTML，从 CDN 直接返回

// CSR 页面 - pages/profile.js
// 没有 getServerSideProps/getStaticProps
export default function Profile() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/profile').then(res => res.json()).then(setData)
  }, [])
  // 首屏返回空 HTML，客户端加载后获取数据
}

```

## 总结

| 页面类型          | HTML 渲染时机        | 数据获取时机   | 导航方式       |
| ----------------- | -------------------- | -------------- | -------------- |
| 首次访问 SSR 页面 | 服务器每次渲染       | 每次请求获取   | 完整页面加载   |
| 首次访问 SSG 页面 | 构建时生成 HTML      | 构建时获取     | CDN 直接返回   |
| 页面内跳转        | 客户端渲染（无刷新） | 通过 JSON 数据 | XHR/Fetch 请求 |
| CSR 页面          | 返回空 HTML          | 客户端获取     | 完整客户端渲染 |

 **核心要点** ：

* ✅ 每个 SSR/SSG 页面首次访问都返回完整 HTML
* ✅ 页面内导航使用 SPA 模式（客户端路由）
* ✅ 不是只有首页渲染 HTML，所有配置了数据获取方法的页面都会
* ✅ SEO 友好，搜索引擎能看到完整内容
* ✅ 混合渲染：可同时使用 SSR、SSG、CSR

# 五、App Router和Pages Router的对比

App Router是Next.js 13+引入的基于文件夹的路由系统，它使用约定式路由，通过文件夹结构自动创建路由：

## 5.1. 核心概念：基于文件系统的路由

```code
app/
├── layout.tsx              # 根布局
├── page.tsx                # 首页（/）
├── about/
│   └── page.tsx            # /about
├── blog/
│   ├── page.tsx            # /blog
│   ├── [slug]/             # 动态路由 /blog/[slug]
│   │   └── page.tsx        # /blog/hello-world
│   └── category/
│       └── [cat]/          # /blog/category/tech
│           └── page.tsx
└── (marketing)/            # 路由组（不影响 URL）
    └── about/
        └── page.tsx        # /about（和 /about/page.tsx 冲突会报错）

```

## 5.2 核心文件类型

| 文件名            | 作用                                |
| ----------------- | ----------------------------------- |
| `page.tsx`      | 路由页面，定义特定路径的 UI         |
| `layout.tsx`    | 布局组件，包裹子页面和子布局        |
| `loading.tsx`   | 加载状态 UI，自动集成Suspense       |
| `error.tsx`     | 错误边界 UI，自动集成Error Boundary |
| `not-found.tsx` | 404 页面                            |
| `template.tsx`  | 模板，每次状态变更重新渲染          |
| `route.ts`      | API 路由                            |

## 5.3 与Pages Router相比，App Router的主要区别：

* 服务器组件: App Router默认使用React服务器组件，而Pages Router使用客户端组件

+ 布局系统: App Router提供了更强大的嵌套布局系统，Pages Router需要使用自定义\_app.js
+ 数据获取: App Router允许在组件中直接使用async/await，Pages Router使用getServerSideProps等函数
+ 文件约定: App Router使用page.js表示路由，Pages Router使用index.js或命名文件

- 路由分组: App Router支持路由组、平行路由和拦截路由等高级功能

# 六、流式渲染

## 6.1 什么是流式渲染？

流式渲染允许服务器**逐步发送** HTML 片段到浏览器，而不是等待整个页面完全渲染后再发送。浏览器可以逐块渲染内容，让用户更快看到页面。

```code
传统渲染：
服务器 → [完整 HTML] → 浏览器渲染 → 用户可见
耗时：等待整个页面渲染完成

流式渲染：
服务器 → [HTML 片段 1] → 浏览器渲染 → 用户可见
        [HTML 片段 2] → 浏览器渲染 → 继续显示
        [HTML 片段 3] → 浏览器渲染 → ...
耗时：用户可以立即看到部分内容
```

## 6.2 基础使用

```tsx
// app/page.tsx
import { Suspense } from 'react'

async function SlowComponent() {
  // 模拟慢速数据获取
  await new Promise(resolve => setTimeout(resolve, 3000))
  return <div>加载完成的内容（3秒后）</div>
}

async function FastComponent() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return <div>快速加载的内容（0.5秒后）</div>
}

export default function Page() {
  return (
    <div>
      <h1>流式渲染示例</h1>
  
      {/* 使用 Suspense 包裹异步组件 */}
      <Suspense fallback={<div>加载慢速组件中...</div>}>
        <SlowComponent />
      </Suspense>
  
      <Suspense fallback={<div>加载快速组件中...</div>}>
        <FastComponent />
      </Suspense>
    </div>
  )
}

```

总结：核心是采用Suspense在渲染的时候用一个占位符替代，等在服务端请求完毕，再流式传输给html，替代之前占位符，用 `loading.js`、`page`内的suspense都可以触发这种流式渲染。 流式渲染特别适合包含多个独立数据区域的页面。

# 七、Next.js 14和15版本有哪些主要特性

## 7.1 Next14的新特性

* React Server Components: 默认使用服务器组件，减少客户端JavaScript体积，提升性能

+ App Router: 基于文件夹的路由系统，支持布局、加载状态和错误处理，简化路由管理
+ 服务器操作(Server Actions): 直接在组件中定义服务器端逻辑，无需创建API路由

  ```tsx
  // app/actions.ts
  'use server'

  import { revalidatePath } from 'next/cache'
  import { redirect } from 'next/navigation'

  export async function createTodo(formData: FormData) {
    const title = formData.get('title') as string

    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title })
    })

    // 重新验证缓存
    revalidatePath('/todos')

    // 可选：重定向
    redirect('/todos')
  }

  // 在组件中使用
  // app/todos/page.tsx
  import { createTodo } from '../actions'

  export default function TodosPage() {
    return (
      <form action={createTodo}>
        <input name="title" placeholder="添加待办事项" />
        <button type="submit">添加</button>
      </form>
    )
  }

  ```
+ 流式渲染(Streaming): 逐步渲染UI，提高用户体验和感知性能
+ Turbopack: 基于Rust的打包工具，提供更快的开发体验和热重载
+ 内置优化: 自动图像、字体和脚本优化，无需额外配置
+ SEO优化: 内置元数据API和结构化数据支持，提升搜索引擎可见性
+ 国际化路由: 内置的多语言支持，简化国际化应用开发
+ Middleware: 请求处理中间件，实现认证、重定向等功能
+ Metadata: 增强类型安全以及动态元数据功能成熟与优化

  ```tsx
  // app/about/page.tsx
  import { Metadata } from 'next'

  // 静态 metaData
  export const metadata: Metadata = {
    title: '关于我们',
    description: '公司介绍',
    openGraph: {
      title: '关于我们',
      description: '公司介绍',
      images: ['/og-image.png']
    },
    twitter: {
      card: 'summary_large_image'
    }
  }

  // 动态 metadata
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.id)

    return {
      title: product.name,
      description: product.description
    }
  }

  ```

## 7.2 Next15的新特性

* 集成React 19
* 部分预渲染
* Server Action改进
  ```tsx
  // app/actions.ts
  'use server'

  import { redirect } from 'next/navigation'
  import { revalidateTag, revalidatePath } from 'next/cache'

  // 简化的 Server Actions
  export async function updateProduct(id: string, data: Product) {
    await db.products.update(id, data)

    // 按标签重新验证
    revalidateTag('products')

    // 或按路径重新验证
    revalidatePath('/products')
  }

  // 带重定向的 Server Actions
  export async function deleteProduct(id: string) {
    await db.products.delete(id)
    redirect('/products')
  }

  // 表单验证集成
  export async function createProduct(formData: FormData) {
    const title = formData.get('title') as string

    if (!title || title.length < 3) {
      return { error: '标题至少 3 个字符' }
    }

    await db.products.create({ title })
    return { success: true }
  }

  ```

# 八、server Action

    简单来说，**Server Actions 就是一个普通的异步函数，但它被赋予了在服务器环境执行的“超能力”** 。即可以从客户端组件调用，无需创建 API 路由。你可以在定义它时，通过添加 `"use server"` 这个特殊的“标记”，来告诉 Next.js：“这个函数，请在服务器上运行！”。

```code
传统方式：
客户端 → API 路由 → 服务器处理 → 返回结果 → 客户端更新

Server Actions：
客户端 → 直接调用服务器函数 → 服务器处理 → 返回结果 → 客户端更新
```

为了让你有更直观的感受，我们来看一个对比：

**传统方式（API 路由）：**

```tsx
// app/api/likes/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { postId } = await request.json();
  // ... 更新数据库点赞数 ...
  console.log(`给文章 ${postId} 点赞`);
  return NextResponse.json({ message: '点赞成功！' });
}

// app/components/LikeButton.js
'use client';

const LikeButton = ({ postId }) => {
  const handleLike = async () => {
    await fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId }),
    });
  };

  return <button onClick={handleLike}>点赞</button>;
};

```

**Server Actions 方式：**

```tsx
// app/components/LikeButton.js
'use client';

import { likePost } from '../actions/likeActions'; // 假设 Server Action 在这个文件里

const LikeButton = ({ postId }) => {
  return (
    <form action={likePost}>
      <input type="hidden" name="postId" value={postId} />
      <button type="submit">点赞</button>
    </form>
  );
};


// app/actions/likeActions.js
'use server';

export async function likePost(formData) {
  const postId = formData.get('postId');
  // ... 更新数据库点赞数 ...
  console.log(`给文章 ${postId} 点赞`);
}

```

## 8.1 revalidatePath和revalidateTag

`revalidatePath` 和 `revalidateTag` 是 Next.js 中用于**缓存重新验证**的函数，用于在数据更新后刷新缓存。

核心区别

| 特性                 | revalidatePath | revalidateTag        |
| -------------------- | -------------- | -------------------- |
| **作用单位**   | URL 路径       | 标签                 |
| **使用方式**   | 直接调用       | 需配合 fetch 的 tags |
| **作用范围**   | 特定路径       | 所有带该标签的请求   |
| **灵活性**     | 较低           | 较高                 |
| **精确控制**   | 路径级         | 标签级               |
| **配置复杂度** | 简单           | 需要 fetch 配置      |

### 8.1.1. revalidatePath - 路径级重新验证

```tsx
// 清除指定路径的缓存
revalidatePath('/products')
// 等同于：删除所有 GET /products 的缓存
```

基本用法

```tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

// 创建产品后，重新验证 /products 路径
export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  
  await db.products.create({ name })
  
  // 只重新验证 /products 这个路径
  revalidatePath('/products')
}
```

revalidatePath 的三种模式

```tsx
// 1. 精确路径匹配
revalidatePath('/products')
// 只重新验证：https://example.com/products

// 2. 布局匹配
revalidatePath('/products', 'layout')
// 重新验证所有以 /products 开头的路径：
// - /products
// - /products/[id]
// - /products/category/[category]
// - /products?filter=new

// 3. 相对路径（不推荐，容易混淆）
revalidatePath('about')
// 重新验证相对于当前请求的路径

```

示例：

```tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

// 场景一：创建文章
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const post = await db.posts.create({ title })
  
  // 重新验证首页和文章列表
  revalidatePath('/')           // 重新验证首页
  revalidatePath('/posts')      // 重新验证文章列表
  
  return { success: true, post }
}

// 场景二：更新文章详情
export async function updatePost(id: string, data: any) {
  await db.posts.update(id, data)
  
  // 只重新验证特定文章页
  revalidatePath(`/posts/${id}`)
  
  return { success: true }
}

// 场景三：删除评论（只影响文章详情）
export async function deleteComment(commentId: string, postId: string) {
  await db.comments.delete(commentId)
  
  // 只重新验证包含这条评论的文章页
  revalidatePath(`/posts/${postId}`)
  
  return { success: true }
}

// 场景四：使用 layout 模式
export async function updateProduct(id: string, data: any) {
  await db.products.update(id, data)
  
  // 重新验证所有产品相关页面
  revalidatePath('/products', 'layout')
  // 这会影响：
  // - /products
  // - /products/[id]
  // - /products/category/[category]
  
  return { success: true }
}

```

### 8.1.2 revalidateTag - 标签级重新验证

```tsx
// 1. 在 fetch 时添加标签
fetch('/api/products', {
  next: { tags: ['products'] }
})

// 2. 重新验证时，清除所有带该标签的缓存
revalidateTag('products')
// 等同于：删除所有 tags 包含 'products' 的请求缓存
```

基本用法

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // 为这个请求添加 'products' 标签
  const products = await fetch('https://api.example.com/products', {
    next: { 
      revalidate: 3600,      // 1 小时自动重新验证
      tags: ['products']     // 添加标签
    }
  }).then(r => r.json())
  
  return <ProductList products={products} />
}

// app/actions.ts
'use server'

import { revalidateTag } from 'next/cache'

// 创建产品后，重新验证所有带 'products' 标签的请求
export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  
  await db.products.create({ name })
  
  // 重新验证所有带 'products' 标签的请求
  // 这会同时更新：
  // - /products 页面
  // - /products/[id] 页面（如果也用了 'products' 标签）
  // - /products/category/tech 页面（如果也用了 'products' 标签）
  revalidateTag('products')
}
```

## 8.2 决策树

```code
需要更新缓存
    │
    ├─ 只影响单个页面？
    │   └─ ✅ 使用 revalidatePath
    │
    ├─ 影响多个页面/位置？
    │   │
    │   ├─ 可以明确列出所有路径？
    │   │   └─ ✅ 使用 revalidatePath（可能需要多次调用）
    │   │
    │   └─ 路径较多或不确定？
    │       └─ ✅ 使用 revalidateTag
    │
    ├─ 需要细粒度控制？
    │   └─ ✅ 使用 revalidateTag + 多标签
    │
    └─ 简单场景？
        └─ ✅ 使用 revalidatePath

```

 **核心区别** ：

* `revalidatePath`：按路径清除缓存，适合明确的单页面更新
* `revalidateTag`：按标签清除缓存，适合跨页面的批量更新

 **最佳实践** ：

* 简单场景用 `revalidatePath`
* 复杂场景用 `revalidateTag`
* 可以组合使用两者

# 九、Next.js中的性能优化

## 1. 图片优化

使用 Image 组件

```tsx
// app/page.tsx
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      {/* ✅ 优先加载关键图片（LCP 优化） */}
      <Image
        src="/hero.jpg"
        alt="Hero banner"
        width={1200}
        height={600}
        priority  // 禁用懒加载，立即加载
        quality={90}
      />
    
      {/* ✅ 懒加载非关键图片 */}
      <Image
        src="/thumb.jpg"
        alt="Thumbnail"
        width={400}
        height={300}
        loading="lazy"  // 默认就是 lazy
        placeholder="blur"  // 模糊占位
        blurDataURL="data:image/jpeg;base64,..."  // 模糊占位数据
      />
    
      {/* ✅ 响应式图片 */}
      <Image
        src="/responsive.jpg"
        alt="Responsive"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    
      {/* ❌ 避免：使用普通 img 标签 */}
      <img src="/image.jpg" alt="Not optimized" />
    </div>
  )
}
```

配置图片域名

```tsx
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // 允许的图片域名
    domains: ['example.com', 'cdn.example.com'],
  
    // 或者使用 remotePatterns（更推荐）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        pathname: '/images/**',
      },
    ],
  
    // 优化的图片格式
    formats: ['image/webp', 'image/avif'],
  
    // 图片尺寸
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
    // 图片优化器
    minimumCacheTTL: 60,  // 缓存时间（秒）
  },
}

export default nextConfig
```

## 2. 代码分割和懒加载

动态导入

```tsx
// app/page.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// ✅ 动态导入非关键组件
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div>加载图表中...</div>,
  ssr: false,  // 只在客户端渲染
})

const Comments = dynamic(() => import('@/components/Comments'), {
  loading: () => <div>加载评论中...</div>,
})

// ✅ 使用 Suspense + 动态导入
const AnalyticsDashboard = dynamic(
  () => import('@/components/AnalyticsDashboard'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-64" />
    ),
  }
)

export default function Page() {
  return (
    <div>
      <h1>页面标题</h1>
    
      <Suspense fallback={<div>加载图表中...</div>}>
        <HeavyChart />
      </Suspense>
    
      <Suspense fallback={<div>加载评论中...</div>}>
        <Comments />
      </Suspense>
    </div>
  )
}

```

条件导入

```tsx
// components/Dashboard.tsx
'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

export default function Dashboard() {
  const [showAnalytics, setShowAnalytics] = useState(false)
  
  // 只在需要时导入
  const Analytics = showAnalytics
    ? dynamic(() => import('./Analytics'), { ssr: false })
    : null
  
  return (
    <div>
      <button onClick={() => setShowAnalytics(true)}>
        显示分析
      </button>
    
      {Analytics && (
        <Suspense fallback={<div>加载中...</div>}>
          <Analytics />
        </Suspense>
      )}
    </div>
  )
}

```


## 3. 缓存策略

### 3.1 fetch 缓存配置

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // ✅ 强制缓存（SSG）
  const products = await fetch('https://api.example.com/products', {
    cache: 'force-cache',  // 强制使用缓存
    next: { revalidate: 3600 }  // 1 小时后重新验证（ISR）
  }).then(r => r.json())
  
  // ✅ 不缓存（SSR）
  const realtimeData = await fetch('https://api.example.com/realtime', {
    cache: 'no-store'  // 每次都重新获取
  }).then(r => r.json())
  
  // ✅ 使用标签缓存
  const featured = await fetch('https://api.example.com/featured', {
    next: { 
      revalidate: 1800,  // 30 分钟
      tags: ['products', 'featured']  // 添加标签
    }
  }).then(r => r.json())
  
  return (
    <div>
      <ProductList products={products} />
      <FeaturedProducts products={featured} />
      <RealtimeData data={realtimeData} />
    </div>
  )
}

```

### 3.2 重新验证缓存

```tsx
// app/actions.ts
'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

// 创建产品后重新验证
export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  
  await db.products.create({ name })
  
  // 重新验证特定路径
  revalidatePath('/products')
  
  // 或重新验证标签
  revalidateTag('products')
}

```


## 4. 静态生成（SSG）和增量静态再生（ISR）

```tsx
// app/blog/[slug]/page.tsx

// 构建时生成静态页面 + ISR 更新
export const revalidate = 3600  // 1 小时后自动更新

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post: Post) => ({
    slug: post.slug
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const post = await getPost(slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>更新时间: {post.updatedAt}</p>
    </article>
  )
}

// ✅ 高频更新的页面使用短 revalidate
export const revalidate = 60  // 1 分钟

// ❌ 静态页面不需要 revalidate
export const dynamic = 'force-static'
```

## 5. 服务端组件（RSC）优化

```tsx
// ✅ 默认使用服务端组件
// app/users/page.tsx

async function UserList() {
  const users = await fetch('https://api.example.com/users', {
    cache: 'force-cache'
  }).then(r => r.json())
  
  return (
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// ✅ 只有需要交互的部分用客户端组件
'use client'

import { useState } from 'react'

export function UserFilter({ users }: { users: User[] }) {
  const [filter, setFilter] = useState('')
  
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  )
  
  return (
    <div>
      <input 
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="搜索用户..."
      />
      <ul>
        {filtered.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

// 组合使用
export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div>
      <h1>用户列表</h1>
      <UserFilter users={users} />
    </div>
  )
}

```

## 6. 字体优化

```tsx
// app/layout.tsx
import { GeistSans, GeistMono } from 'next/font/google'

const geistSans = GeistSans({
  subsets: ['latin'],
  display: 'swap',  // 首先使用系统字体，加载后切换
  variable: '--font-geist-sans',
  preload: true,  // 预加载
})

const geistMono = GeistMono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  preload: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={geistSans.variable}>
      <body className={geistMono.className}>
        {children}
      </body>
    </html>
  )
}

```

自定义字体

```
// app/layout.tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  display: 'swap',
  variable: '--my-font',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={myFont.className}>
        {children}
      </body>
    </html>
  )
}

```


## 7. 性能监控

使用web Vitals

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  console.log(entry.name, entry.startTime, entry.duration)
                })
              })
              observer.observe({ entryTypes: ['largest-contentful-paint'] })
            }
          `}
        </Script>
      </body>
    </html>
  )
}

// app/analytics/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const vitals = await request.json()
  
  // 发送到分析服务
  await fetch('https://analytics.example.com/vitals', {
    method: 'POST',
    body: JSON.stringify(vitals)
  })
  
  return NextResponse.json({ success: true })
}

```


## 8. 资源优化

### 8.1 预加载关键资源

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* DNS 预解析 */}
        <link rel="dns-prefetch" href="//cdn.example.com" />
      
        {/* 预连接 */}
        <link rel="preconnect" href="https://api.example.com" />
      
        {/* 预加载关键 CSS */}
        <link 
          rel="preload" 
          href="/styles/critical.css" 
          as="style"
        />
      
        {/* 预加载字体 */}
        <link 
          rel="preload" 
          href="/fonts/main.woff2" 
          as="font" 
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

```


### 8.2 脚本优化

```tsx
// app/page.tsx
import Script from 'next/script'

export default function Page() {
  return (
    <div>
      {/* ✅ 策略选择 */}
    
      {/* afterInteractive: 尽快执行（默认） */}
      <Script 
        src="https://example.com/analytics.js"
        strategy="afterInteractive"
      />
    
      {/* lazyOnload: 页面空闲时执行 */}
      <Script 
        src="https://example.com/chat-widget.js"
        strategy="lazyOnload"
      />
    
      {/* beforeInteractive: 页面渲染前执行 */}
      <Script 
        src="https://example.com/critical.js"
        strategy="beforeInteractive"
      />
    
      {/* inlineScript: 内联脚本 */}
      <Script id="inline-script" strategy="afterInteractive">
        {`console.log('Inline script')`}
      </Script>
    </div>
  )
}

```


## 9. CDN 和 Edge Runtime

```tsx
// app/api/hello/route.ts
export const runtime = 'edge'  // 使用边缘运行时

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 在边缘节点执行，响应更快
  const name = request.nextUrl.searchParams.get('name') || 'World'
  
  return NextResponse.json({ message: `Hello ${name}` })
}

```

使用 CDN 托管静态资源

```tsx
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态资源 CDN
  assetPrefix: 'https://cdn.example.com',

  // 输出静态文件
  output: 'standalone',

  // 压缩
  compress: true,

  // 生成 ETag
  generateEtags: true,
};

export default nextConfig;
```


## 10. 数据获取优化

```tsx
// app/page.tsx
import { Suspense } from 'react'

// ✅ 并行获取数据
async function ParallelData() {
  const [products, users, stats] = await Promise.all([
    fetch('/api/products').then(r => r.json()),
    fetch('/api/users').then(r => r.json()),
    fetch('/api/stats').then(r => r.json()),
  ])
  
  return (
    <div>
      <ProductList products={products} />
      <UserList users={users} />
      <Stats stats={stats} />
    </div>
  )
}

// ❌ 串行获取（慢）
async function SerialData() {
  const products = await fetch('/api/products').then(r => r.json())
  const users = await fetch('/api/users').then(r => r.json())
  const stats = await fetch('/api/stats').then(r => r.json())
  
  return <div>...</div>
}

// ✅ 细粒度 Suspense
export default function Page() {
  return (
    <div>
      {/* 独立加载，互不阻塞 */}
      <Suspense fallback={<div>加载产品...</div>}>
        <Products />
      </Suspense>
    
      <Suspense fallback={<div>加载用户...</div>}>
        <Users />
      </Suspense>
    
      <Suspense fallback={<div>加载统计...</div>}>
        <Stats />
      </Suspense>
    </div>
  )
}

```


## 11. 减少包体积

```tsx
// ✅ 使用 Tree Shaking
// lib/utils.ts
import { formatDate, formatNumber } from 'date-fns'

// ❌ 导入整个库
import * as _ from 'lodash'

// ✅ 只导入需要的函数
import { debounce } from 'lodash-es'

// ✅ 使用轻量级替代方案
import { clsx } from 'clsx'  // 而不是 classnames
import { twMerge } from 'tailwind-merge'

```

代码分析

```tsx
# 分析包体积
npm run build
# 查看输出：页面大小和总包体积

# 使用 bundle analyzer
npm install @next/bundle-analyzer

# next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer({
  // 其他配置
})

```


## 12. 性能配置

```tsx
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 启用 Turbopack（Next.js 14+）
  // 使用 --turbo 标志启动开发服务器
  
  // 压缩
  compress: true,
  
  // 生产源映射
  productionBrowserSourceMaps: false,  // 生产环境不生成 source map
  
  // 优化导入
  optimizePackageImports: ['lodash'],
  
  // SWC 压缩器
  swcMinify: true,
  
  // 实验性功能
  experimental: {
    // 启用 App Router（Next.js 13+）
    appDir: true,
  
    // 优化 CSS
    optimizeCss: true,
  },
  
  // 页面预渲染限制
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

export default nextConfig

```


## 性能优化检查清单

| 优化项          | 说明          | 优先级     |
| --------------- | ------------- | ---------- |
| 使用 Image 组件 | 自动优化图片  | ⭐⭐⭐⭐⭐ |
| 动态导入        | 按需加载代码  | ⭐⭐⭐⭐⭐ |
| SSG/ISR         | 静态生成      | ⭐⭐⭐⭐⭐ |
| 服务端组件      | 减少客户端 JS | ⭐⭐⭐⭐⭐ |
| 缓存策略        | fetch 缓存    | ⭐⭐⭐⭐   |
| 字体优化        | next/font     | ⭐⭐⭐⭐   |
| CDN/Edge        | 边缘计算      | ⭐⭐⭐⭐   |
| 并行数据获取    | Promise.all   | ⭐⭐⭐⭐   |
| 预加载资源      | link 标签     | ⭐⭐⭐     |
| 流式渲染        | Suspense      | ⭐⭐⭐     |

# 十、SEO优化策略

## 10.1. Metadata API（元数据管理)

### 基础Metadata

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的网站',
  description: '这是网站的描述，对 SEO 很重要',
  keywords: '关键词1, 关键词2, 关键词3',
  authors: [{ name: '作者名字', url: 'https://example.com' }],
  creator: '创建者',
  publisher: '发布者',
  
  // Open Graph（社交媒体分享）
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://example.com',
    title: '我的网站',
    description: '网站描述',
    siteName: '网站名称',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Graph 图片',
      },
    ],
  },
  
  // Twitter 卡片
  twitter: {
    card: 'summary_large_image',
    title: '我的网站',
    description: '网站描述',
    images: ['https://example.com/twitter-image.jpg'],
    creator: '@username',
  },
  
  // 图标
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  // 规范化链接
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'zh-CN': 'https://example.com',
      'en-US': 'https://example.com/en',
    },
  },
  
  // 机器人配置
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // 视口设置
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

```

### 动态 Metadata

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from 'next'

// 异步生成 metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)
  
  return {
    title: `${product.name} - 我的产品商城`,
    description: product.description,
    keywords: product.tags.join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'website',
    },
    twitter: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://example.com/products/${product.id}`,
    },
  }
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 页面内容
  return <div>...</div>
}

// 辅助函数
async function getProduct(id: string) {
  // 模拟数据库查询
  return {
    id: 1,
    name: '笔记本电脑',
    description: '高性能笔记本电脑',
    image: 'https://example.com/laptop.jpg',
    tags: ['电脑', '笔记本', '游戏'],
  }
}

```


## 10.2. 结构化数据（Schema.org）

```tsx
// app/products/[id]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next'
import Script from 'next/script'

// JSON-LD 结构化数据组件
function StructuredData({ data }: { data: any }) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)
  
  // 产品结构化数据
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: '品牌名',
    },
    offers: {
      '@type': 'Offer',
      url: `https://example.com/products/${product.id}`,
      priceCurrency: 'CNY',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }
  
  return (
    <div>
      <StructuredData data={productSchema} />
    
      <article>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </article>
    </div>
  )
}

```


### 多种结构化数据类型

```
// 文章结构化数据
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '文章标题',
  image: 'https://example.com/image.jpg',
  author: {
    '@type': 'Person',
    name: '作者名',
  },
  datePublished: '2024-01-01',
  dateModified: '2024-01-02',
}

// 面包屑导航结构化数据
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首页',
      item: 'https://example.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '产品',
      item: 'https://example.com/products',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '产品详情',
      item: 'https://example.com/products/1',
    },
  ],
}

// 组织结构化数据
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '公司名称',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-123-4567-8900',
    contactType: 'customer service',
  },
}

```


## 10.3. 站点地图

### 动态站点地图

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com'
  
  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  
  // 动态页面
  const products = await getProducts()
  const productPages = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))
  
  const posts = await getPosts()
  const blogPages = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...productPages, ...blogPages]
}

// 辅助函数
async function getProducts() {
  // 从数据库或 API 获取
  return [
    { id: 1, updatedAt: '2024-01-01' },
    { id: 2, updatedAt: '2024-01-02' },
  ]
}

async function getPosts() {
  return [
    { slug: 'hello-world', updatedAt: '2024-01-01' },
    { slug: 'next-post', updatedAt: '2024-01-02' },
  ]
}

```


### robots.txt

```tsx
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://example.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

```


## 10.4. 性能优化 SEO

### 图片优化

```tsx
// app/products/[id]/page.tsx
import Image from 'next/image'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.id)
  
  return (
    <div>
      {/* 关键图片 - 优先加载 */}
      <Image
        src={product.mainImage}
        alt={product.name}
        width={1200}
        height={600}
        priority
        quality={90}
      />
    
      {/* 图库 - 懒加载 */}
      <div className="gallery">
        {product.gallery.map((img: string, index: number) => (
          <Image
            key={index}
            src={img}
            alt={`${product.name} 图片 ${index + 1}`}
            width={400}
            height={300}
            loading="lazy"
            placeholder="blur"
          />
        ))}
      </div>
    </div>
  )
}

```


### 核心网页指标优化

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 预加载关键资源 */}
        <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="dns-prefetch" href="//cdn.example.com" />
      </head>
      <body>
        {children}
      
        {/* Web Vitals 监控 */}
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  // 发送到分析服务
                  fetch('/api/analytics/vitals', {
                    method: 'POST',
                    body: JSON.stringify({
                      name: entry.name,
                      value: entry.startTime,
                    })
                  })
                })
              })
              observer.observe({ entryTypes: ['largest-contentful-paint'] })
            }
          `}
        </Script>
      </body>
    </html>
  )
}

```


## 10.5. 内容优化

### 语义化 HTML

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)
  
  return (
    <article itemScope itemType="https://schema.org/Article">
      {/* 头部 */}
      <header>
        <h1 itemProp="headline">{post.title}</h1>
        <time dateTime={post.datePublished} itemProp="datePublished">
          {new Date(post.datePublished).toLocaleDateString()}
        </time>
        <address>
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">{post.author.name}</span>
          </span>
        </address>
      </header>
    
      {/* 主要内容 */}
      <main>
        <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    
      {/* 相关内容 */}
      <section>
        <h2>相关文章</h2>
        <nav aria-label="相关文章">
          <ul>
            {post.related.map((related: any) => (
              <li key={related.id}>
                <a href={`/blog/${related.slug}`}>{related.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    
      {/* 面包屑导航 */}
      <nav aria-label="面包屑导航">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a href="/" itemProp="item">
              <span itemProp="name">首页</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a href="/blog" itemProp="item">
              <span itemProp="name">博客</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{post.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>
    </article>
  )
}

```


### 面包屑导航组件

```tsx
// components/Breadcrumbs.tsx
import Link from 'next/link'

interface Breadcrumb {
  name: string
  href: string
}

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="面包屑导航" className="breadcrumbs">
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index === items.length - 1 ? (
              <span itemProp="name">{item.name}</span>
            ) : (
              <Link href={item.href} itemProp="item">
                <span itemProp="name">{item.name}</span>
              </Link>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}

// 使用
<Breadcrumbs
  items={[
    { name: '首页', href: '/' },
    { name: '产品', href: '/products' },
    { name: '笔记本电脑', href: '/products/1' },
  ]}
/>

```


## 10.6. 国际化 SEO

```tsx
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  i18n: {
    locales: ['zh-CN', 'en-US', 'ja-JP'],
    defaultLocale: 'zh-CN',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.cn',
        defaultLocale: 'zh-CN',
      },
      {
        domain: 'example.jp',
        defaultLocale: 'ja-JP',
      },
    ],
  },
}

export default nextConfig

// app/[lang]/layout.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    'zh-CN': '我的网站',
    'en-US': 'My Website',
    'ja-JP': '私のウェブサイト',
  }
  
  return {
    title: titles[lang as keyof typeof titles],
    alternates: {
      canonical: `https://example.com/${lang}`,
      languages: {
        'zh-CN': 'https://example.com/zh-CN',
        'en-US': 'https://example.com/en-US',
        'ja-JP': 'https://example.com/ja-JP',
      },
    },
  }
}

```


## SEO 优化检查清单

| 优化项      | 说明                  | 优先级     |
| ----------- | --------------------- | ---------- |
| Metadata    | 完整的页面元数据      | ⭐⭐⭐⭐⭐ |
| 结构化数据  | Schema.org JSON-LD    | ⭐⭐⭐⭐⭐ |
| 站点地图    | 动态生成 sitemap.xml  | ⭐⭐⭐⭐⭐ |
| robots.txt  | 搜索引擎爬取规则      | ⭐⭐⭐⭐⭐ |
| 图片优化    | Image 组件 + alt 文本 | ⭐⭐⭐⭐⭐ |
| 语义化 HTML | 正确使用语义标签      | ⭐⭐⭐⭐⭐ |
| 性能优化    | 核心 Web 指标         | ⭐⭐⭐⭐⭐ |
| 面包屑导航  | 改善导航结构          | ⭐⭐⭐⭐   |
| 规范化 URL  | 避免重复内容          | ⭐⭐⭐⭐   |
| Open Graph  | 社交媒体分享          | ⭐⭐⭐⭐   |
