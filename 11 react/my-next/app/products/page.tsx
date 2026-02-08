import Link from 'next/link';

const products = [
  { id: 1, name: '笔记本电脑', price: 5999 },
  { id: 2, name: '无线鼠标', price: 199 },
  { id: 3, name: '机械键盘', price: 899 },
  { id: 4, name: '显示器', price: 1499 },
  { id: 5, name: 'USB 集线器', price: 299 },
];

export default function Products() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>产品列表</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h2>{product.name}</h2>
            <p>价格：¥{product.price}</p>
            <Link href={`/products/${product.id}`}>
              <button style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                查看详情
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
