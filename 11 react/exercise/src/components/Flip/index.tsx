import { useEffect, useRef, useState } from 'react'
import './index.scss'

type Props = {}

const Flip = (props: Props) => {
  const [isFlipping, setIsFlipping] = useState(false)
  // 如果向下翻，默认为0，向上默认为1
  const [frontcount, setFrontCount] = useState(1)
  // 如果向下翻，默认为1，向上默认为0
  const [backcount, setBackCount] = useState(0)
  const [isGo, setIsGo] = useState(false)
  // 默认向上翻
  const [isDown, setIsDown] = useState(false)

  // 向下翻转+1
  function flipDown() {
    setIsDown(true)
    // 如果处于翻转中，则不执行
    if (isFlipping) {
      return false
    }
    const nextFrontCount = frontcount >= 9 ? 0 : frontcount + 1
    setIsGo(true)
    setIsFlipping(true)
    setTimeout(() => {
      setFrontCount(nextFrontCount)
      setIsGo(false)
      setIsFlipping(false)
      const nextBackCount = backcount >= 9 ? 0 : backcount + 1
      setBackCount(nextBackCount)
    }, 1000)
  }
  // 向上翻转-1
  function flipUp() {
    setIsDown(false)
    console.log('aaaaaaaaaaaa')
    if (isFlipping) {
      return false
    }
    const nextFrontCount = frontcount <= 0 ? 9 : frontcount - 1
    setIsGo(true)
    setIsFlipping(true)
    setTimeout(() => {
      console.log('=========nextFrontCount', nextFrontCount)

      setFrontCount(nextFrontCount)
      setIsGo(false)
      setIsFlipping(false)
      const nextBackCount = backcount <= 0 ? 9 : backcount - 1
      setBackCount(nextBackCount)
    }, 1000)
  }

  const handleDown = () => {
    flipDown()
  }
  const handleUp = () => {
    flipUp()
  }

  const initData = (direction: 'up' | 'down') => {
    if(direction === 'up') {
      setFrontCount(1)
      setBackCount(0)
    } else {
      setFrontCount(0)
      setBackCount(1)
    }
  }

  // useEffect(() => {
  //   const btn1 = btn1Ref.current
  //   const btn2 = btn2Ref.current
  //   const frontNode = frontRef.current
  //   const backNode = backRef.current
  //   var flip = document.getElementById('flip')
  //   // var backNode = document.querySelector('.back')
  //   // var frontNode = document.querySelector('.front')
  //   // var btn1 = document.getElementById('btn1')
  //   // var btn2 = document.getElementById('btn2')
  //   btn1.addEventListener('click', function () {
  //     flipDown()
  //   })
  //   btn2.addEventListener('click', function () {
  //     flipUp()
  //   })
  //   // 当前数字
  //   var count = 0
  //   // 是否正在翻转（防止翻转未结束就进行下一次翻转）
  //   var isFlipping = false
  // }, [])

  return (
    <>
      <div className={`flip ${isDown ? 'down' : 'up'} ${isGo ? 'go' : ''}`}>
        <div className={`digital front number${frontcount}`}></div>
        <div className={`digital back number${backcount}`}></div>
      </div>
      <div className='btn-con'>
        <button id='btn1' onClick={handleDown}>
          向下翻+1
        </button>
        <button id='btn2' onClick={handleUp}>
          向上翻-1
        </button>
      </div>
      {/*  */}
    </>
  )
}

export default Flip
