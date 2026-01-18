import React, { useEffect, useRef } from 'react'

import './sticky.scss'

type Props = {}

const Sticky = (props: Props) => {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const main = mainRef.current
    const title = titleRef.current
    if (!main || !title) return

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const rect = main.getBoundingClientRect()
        const vh = window.innerHeight || document.documentElement.clientHeight

        // 计算一个 0 - 1 的进度值, 0 表示未进入可视区, 1 表示主要区域大部分已滚过
        const total = rect.height + vh
        const visible = vh - rect.top
        
        let progress = visible / total
        progress = Math.min(Math.max(progress, 0), 1)

        // 根据进度映射到 scale 与 opacity
        const scale = 1 + progress * 1 // 从 1 到 2
        const opacity = 1 - progress // 从 1 到 0

        title.style.transform = `translateY(-50%) scale(${scale})`
        title.style.opacity = `${opacity}`

        ticking = false
      })
    }

    // 初始化一次
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className='sticky-wrap'>
      <div className="sticky-main" ref={mainRef}>
        <h1 ref={titleRef}>我是主要内容区</h1>
      </div>
      <div className="sticky-aside">其他的内容。。。</div>
    </div>
  )
}

export default Sticky
