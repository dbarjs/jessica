<script setup lang="ts">
import { format } from 'date-fns'

type SystemStatus = {
  ok: true
  freeSystemMemoryInBytes: number
  totalSystemMemoryInBytes: number
  uptimeInSeconds: number
} | {
  ok?: false
  error: string
}

const currentISODate = ref<string>('')

const timeDisplay = computed<string>(() => {
  if (!currentISODate.value)
    return '..:..'

  return format(currentISODate.value, 'H:mm') // 00:00 - 23:59
})

const dateDisplay = computed<string>(() => {
  if (!currentISODate.value)
    return '...'

  return format(currentISODate.value, 'E, MMMM yy') // 1st January 2022
})

const { data: systemStatus, refresh: refreshSystemStatus, status: systemStatusStatus, pending: isSystemStatusPending, execute: fetchSystemStatus,
} = useLazyAsyncData<SystemStatus | null>(async () => {
  try {
    const response = await $fetch<SystemStatus>('http://localhost:9999/')

    return response
  }
  catch (error) {
    return null
  }
})

const memoryDisplay = computed<string>(() => {
  if (!systemStatus?.value) {
    if (isSystemStatusPending.value && systemStatusStatus.value === 'idle')
      return 'Loading...'

    return 'Connection error'
  }

  if (!systemStatus.value.ok)
    return 'System error'

  const { freeSystemMemoryInBytes, totalSystemMemoryInBytes } = systemStatus.value

  return `Memory: ${Math.round(freeSystemMemoryInBytes / totalSystemMemoryInBytes * 100)}%`
})

const uptimeDisplay = computed<string>(() => {
  if (!systemStatus?.value)
    return 'Connection error'

  if (!systemStatus.value.ok)
    return 'System error'

  return `Uptime: ${Math.round(systemStatus.value.uptimeInSeconds / 60 / 60)}h`
})

onMounted(() => {
  currentISODate.value = new Date().toISOString()

  setInterval(() => {
    currentISODate.value = new Date().toISOString()
  }, 1000)

  fetchSystemStatus()

  setInterval(() => {
    refreshSystemStatus()
  }, 5000)
})
</script>

<template>
  <ULandingHero
    :title="timeDisplay"
    :description="dateDisplay"
    :ui="{
      title: 'text-7xl sm:text-8xl',
    }"
  >
    <div class="flex gap-2 justify-center">
      <UBadge>
        {{ memoryDisplay }}
      </UBadge>

      <UBadge>
        {{ uptimeDisplay }}
      </UBadge>
    </div>
  </ULandingHero>
</template>
