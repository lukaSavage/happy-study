# 一、浏览器的渲染模式

> 目前主流的渲染模式大致分为4大类：

* ‌ **客户端渲染（CSR, Client-Side Rendering）** ‌：服务器仅返回一个空的 HTML 骨架，页面内容由浏览器下载并执行 JavaScript 后动态生成。优点是前后端分离彻底、服务器负担轻，适合交互复杂的单页应用（SPA）；缺点是首屏加载慢、SEO 效果差。‌
* ‌ **服务器端渲染（SSR, Server-Side Rendering）** ‌：在服务器端完成页面的完整渲染，将生成的 HTML 直接返回给浏览器。优点是首屏加载快、SEO 友好，适合内容型网站如电商、博客；缺点是服务器压力较大，且需要维护 Node.js 中间层。‌**1**2
* ‌ **静态站点生成（SSG, Static Site Generation）** ‌：在构建阶段（如执行 `npm run build`）就预先生成所有页面的静态 HTML 文件，部署时直接提供这些文件。优点是性能极佳、成本低、安全性高；缺点是无法处理动态内容，适合内容更新频率低的网站。‌
* ‌ **增量静态再生（ISR, Incremental Static Regeneration）** ‌：结合了 SSG 和 SSR 的优势，允许在部署后按需或定时重新生成特定页面，而无需重建整个站点。它在保持静态性能的同时，支持动态内容更新，适用于内容频繁变化但又希望保持高性能的网站（如新闻门户）。‌
* ‌ **混合渲染（Hybrid Rendering）** ‌：在同一个项目中混合使用多种渲染模式，例如对首页使用 SSR，对用户个人中心使用 CSR，或在组件级别实现“孤岛架构”（Island Architecture）。这种模式灵活性高，能针对不同页面或组件优化体验，是现代框架（如 Next.js、Nuxt.js）的推荐实践。‌

# 二、Next的渲染原理

> Next.js 是一个基于 React 的框架，它提供了静态站点生成（Static Site Generation, SSG）、服务器端渲染（Server-Side Rendering, SSR）和客户端渲染（Client-Side Rendering, CSR）等多种渲染模式。理解 Next.js 的渲染过程对于开发高效、可扩展的 web 应用至关重要。以下是 Next.js 的主要渲染流程概述：

### 1. 静态站点生成（SSG）

‌**静态站点生成**‌是 Next.js 的一个核心特性，它允许你在构建时预先渲染页面。这对于内容不经常变化的网站非常有用，因为它可以显著提高性能和安全性。

‌ **工作流程：** ‌

* ‌**页面组件**‌：在 `pages` 目录下创建 React 组件，例如 `pages/index.js`。
* ‌**数据获取**‌：在页面的 `getStaticProps` 函数中获取数据。这个函数在构建时调用，并将数据作为 props 传递给组件。
* ‌**生成页面**‌：Next.js 在构建阶段为每个页面调用 `getStaticProps`，然后使用这些数据生成 HTML 文件。
* ‌**部署**‌：生成的 HTML 文件可以直接部署到 CDN 或任何静态文件服务器。

### 2. 服务器端渲染（SSR）

‌**服务器端渲染**‌使得每个页面请求时都可以动态生成页面内容。这对于需要根据请求动态生成内容的网站非常有用。

‌ **工作流程：** ‌

* ‌**页面组件**‌：与 SSG 类似，在 `pages` 目录下创建 React 组件。
* ‌**数据获取**‌：在页面的 `getServerSideProps` 函数中获取数据。这个函数在每次页面请求时调用，并将数据作为 props 传递给组件。
* ‌**页面渲染**‌：每次请求到达服务器时，服务器都会调用 `getServerSideProps` 来获取数据，然后使用这些数据渲染 HTML 并发送给客户端。

### 3. 客户端渲染（CSR）

虽然 Next.js 主要支持 SSG 和 SSR，但你也可以通过不使用 `getStaticProps` 或 `getServerSideProps` 来实现客户端渲染。在这种情况下，React 组件将在客户端加载后进行初始渲染。

‌ **工作流程：** ‌

* ‌**页面组件**‌：在 `pages` 目录下创建 React 组件。
* ‌**无数据获取**‌：不使用 `getStaticProps` 或 `getServerSideProps`。
* ‌**客户端渲染**‌：首次加载时，Next.js 将加载 JavaScript 包和必要的代码，然后在客户端进行初始渲染。

### 4. 增量静态生成（ISG）

Next.js 13 引入了增量静态生成（Incremental Static Generation, ISG），它结合了 SSG 和 SSR 的优点。你可以为某些页面启用 ISG，这样这些页面既可以静态生成，也可以在需要时动态更新。

‌ **工作流程：** ‌

* ‌**页面组件**‌：与 SSG 和 SSR 类似，创建 React 组件。
* ‌**数据获取**‌：使用 `getStaticProps` 或 `getServerSideProps` 获取数据。
* ‌**动态更新**‌：对于支持 ISG 的页面，当数据更新时，可以重新生成或更新静态页面，而不需要每次都重新生成整个网站。

### 总结

Next.js 通过这些不同的渲染模式提供了灵活性和性能优化。选择合适的渲染模式取决于你的具体需求，比如内容是否频繁更新、是否需要快速加载时间等。通过合理使用这些特性，你可以构建出高性能的 web 应用。

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
