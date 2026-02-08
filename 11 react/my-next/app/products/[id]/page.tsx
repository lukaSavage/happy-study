/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2026-02-07 11:41:46
 * @LastEditors: lukasavage
 * @LastEditTime: 2026-02-07 12:44:41
 * @FilePath: \happy-study\11 react\my-next\app\products\[id]\page.tsx
 */
// import { useRouter } from 'next/navigation';

const productDetails = {
  1: { name: '笔记本电脑', description: '高性能笔记本电脑，适合办公和游戏。', price: 5999 },
  2: { name: '无线鼠标', description: '舒适的无线鼠标，适合日常使用。', price: 199 },
  3: { name: '机械键盘', description: '高质量机械键盘，适合打字和游戏。', price: 899 },
  4: { name: '显示器', description: '高清显示器，适合办公和娱乐。', price: 1499 },
  5: { name: 'USB 集线器', description: '多功能 USB 集线器，扩展你的设备连接。', price: 299 },
};

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // 解包 Promise
  const product = productDetails[resolvedParams.id as unknown as keyof typeof productDetails];

  if (!product) {
    return <h1>产品未找到</h1>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>价格：¥{product.price}</p>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(productDetails).map((id) => ({ id }));
}