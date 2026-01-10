import React, { useEffect, useRef, useState } from 'react'
import './Test.css'

type Props = {}

type ImageItem = {
  id: number
  title: string
  src: string
}

const images: ImageItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `示例图片 ${i + 1}`,
  src: `https://picsum.photos/seed/picsum-${i + 1}/600/400`
}))

const Test = (props: Props) => {
  const [openId, setOpenId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      // 如果点击发生在容器外面，关闭任何打开的菜单
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenId(null)
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenId(null)
    }

    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function toggleMenu(id: number) {
    setOpenId(prev => (prev === id ? null : id))
  }

  function onOptionClick(opt: string, item: ImageItem) {
    // 这里只是示例，实际可替换为下载/分享等逻辑
    alert(`${opt}：${item.title}`)
    setOpenId(null)
  }

  return (
    <div ref={containerRef} className='image-grid'>
      {images.map(it => (
        <div className='card' key={it.id}>
          {/* <img src={it.src} alt={it.title} /> */}
          <div className='card-footer'>
            <div className='title'>{it.title}</div>
            <div className='menu'>
              <button
                className='dots'
                aria-expanded={openId === it.id}
                aria-haspopup='true'
                onClick={e => {
                  e.stopPropagation()
                  toggleMenu(it.id)
                }}
                title='更多'
              >
                ⋯
              </button>

              <div className={`dropdown ${openId === it.id ? 'open' : ''}`} role='menu' onClick={e => e.stopPropagation()}>
                <button className='item' onClick={() => onOptionClick('下载', it)}>
                  下载
                </button>
                <button className='item' onClick={() => onOptionClick('分享', it)}>
                  分享
                </button>
                <button className='item' onClick={() => onOptionClick('删除', it)}>
                  删除
                </button>
              </div>
            </div>
          </div>
          <div className='divider'></div>
          <div className='list-ul'>
            <div className='list-li'>
              <div className='label'></div>
              <div className='value'>高一（二班）</div>
            </div>
            <div className='list-li'>
              <div className='label'></div>
              <div className='value'>1个课后作业</div>
            </div>
            <div className='list-li'>
              <div className='label'></div>
              <div className='value'>48个学生</div>
            </div>
            <div className='list-li'>
              <div className='label'></div>
              <div className='value'>45分钟/课</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Test
