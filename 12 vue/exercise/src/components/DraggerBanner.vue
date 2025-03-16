<template>
  <div class="dragger-banner">
    <div class="banner-left" ref="leftRef">
      <slot name="left"></slot>
    </div>
    <div class="resize" ref="resizeDom">⋮</div>
    <div class="banner-right" ref="rightRef">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
/**
 * 参数说明：
 * layout: [number, number]
 * layout[0]: 左边宽度比例
 * layout[1]: 右边宽度比例
 * minLeftWidth: 左边最小宽度
 * minRightWidth: 右边最小宽度
 */
export type Layout = [number, number];
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  layout?: Layout,
  minLeftWidth?: number,
  minRightWidth?: number
}>(), {
  layout: () => [2, 1],
  minLeftWidth: 0,
  minRightWidth: 0
})

const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
const resizeDom = ref<HTMLElement | null>(null)

let isDragging = false
let startX = 0
let startLeftWidth = 0

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging || !leftRef.value || !rightRef.value) return
  const deltaX = event.clientX - startX
  const newLeftWidth = startLeftWidth + deltaX
  const containerWidth = leftRef.value.parentElement?.getBoundingClientRect().width || 0
  const newRightWidth = containerWidth - newLeftWidth - resizeDom.value!.offsetWidth

  if (newLeftWidth >= props.minLeftWidth && newRightWidth >= props.minRightWidth) {
    leftRef.value.style.flex = `0 0 ${newLeftWidth}px`
    rightRef.value.style.flex = `1 1 ${newRightWidth}px`
  }
}

const onMouseUp = () => {
  isDragging = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

const onMouseDown = (event: MouseEvent) => {
  if (!leftRef.value) return
  isDragging = true
  startX = event.clientX
  startLeftWidth = leftRef.value.getBoundingClientRect().width
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

onMounted(() => {
  // 初始化
  if (props.layout) {
    if (leftRef.value) {
      leftRef.value.style.flex = `0 0 ${props.layout[0]}fr`
    }
    if (rightRef.value) {
      rightRef.value.style.flex = `1 1 ${props.layout[1]}fr`
    }
  }
  if (resizeDom.value) {
    resizeDom.value.addEventListener('mousedown', onMouseDown)
  }
})

onBeforeUnmount(() => {
  if (resizeDom.value) {
    resizeDom.value.removeEventListener('mousedown', onMouseDown)
  }
})
</script>

<style scoped>
.dragger-banner {
  display: flex;
  width: 100%;
}
.banner-left {
  flex: 1;
  background-color: #ccc;
}
.resize {
  cursor: ew-resize;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.banner-right {
  flex: 1;
  background-color: #f90;
}
</style>
