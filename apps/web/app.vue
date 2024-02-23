<script setup lang="ts">
const { $pwa } = useNuxtApp()
const toast = useToast()
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'Nuxt UI Pro - Dashboard template'
const description = 'Nuxt UI Pro is a collection of premium Vue components built on top of Nuxt UI to create beautiful & responsive Nuxt applications in minutes.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  if ($pwa?.offlineReady) {
    toast.add({
      id: 'offline-ready',
      title: 'Offline ready',
      description: 'This app is ready to work offline',
    })

    return
  }

  toast.add({
    id: 'offline-ready',
    title: 'Offline not ready',
    description: 'This app is not ready to work offline',
    timeout: 2000,
  })
})
</script>

<template>
  <div>
    <NuxtPwaManifest />

    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
  </div>
</template>
