<template>
  <div class="video-container">
    <div class="overlay"></div>

    <video
      ref="videoRef"
      class="video-background"
      :src="videoSrc"
      autoplay
      loop
      muted
      playsinline
      :poster="poster"
    ></video>
    <div class="section-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps<{
  videoSrc: string;
  poster?: string; // Optional image to show before video loads
  isActive: boolean; // Prop to control playback
}>();

const videoRef = ref<HTMLVideoElement | null>(null);

// Watch the isActive prop to control video playback
watch(
  () => props.isActive,
  (newIsActive) => {
    if (videoRef.value) {
      if (newIsActive) {
        // Use a try/catch for play() as it returns a Promise and can fail
        videoRef.value.play().catch((error) => {
          console.error("Video playback failed:", error);
          // This often happens if the browser blocks autoplay without user interaction.
          // Muting helps, but if it still fails, the poster will be visible.
        });
      } else {
        videoRef.value.pause();
        videoRef.value.currentTime = 0; // Rewind for a clean start next time
      }
    }
  },
  { immediate: true }
);

// On mount, ensure the video attempts to play if active
onMounted(() => {
  if (props.isActive && videoRef.value) {
    videoRef.value.play().catch(() => {});
  }
});
</script>

<style scoped>
/* Video container takes full space */
.video-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 10rem;
  .overlay {
    z-index: 14 !important;
    position: absolute;
    inset: 0;
    pointer-events: none;

    /* gradient tint — strong top/bottom darkness, light middle */
    background: linear-gradient(
      to bottom,
      rgba(2, 58, 56, 1) 0%,
      rgba(2, 58, 56, 0.7) 10%,
      rgba(2, 58, 56, 0.3) 20%,
      rgba(2, 58, 56, 0.2) 50%,
      rgba(2, 58, 56, 0.3) 70%,
      rgba(2, 58, 56, 0.7) 90%,
      rgba(2, 58, 56, 1) 100%
    );
  }
}
</style>
