<template>
  <div
    class="hero-showcase"
    :dir="rtl ? 'rtl' : 'ltr'"
    :style="{
      '--bg-url': `url(${background})`,
      '--header-height': headerHeight,
    }"
    role="region"
    aria-label="Hero showcase"
  >
    <div class="overlay">
      <div class="container-fluid hero-inner">
        <div class="logos-wrap" role="list" aria-label="Partner logos">
          <div class="logos-grid" :class="{ 'start-animation': shouldAnimate }">
            <a
              v-for="(logo, idx) in logos"
              :key="logo.alt ?? idx"
              :href="logo.href ?? '#'"
              class="logo-card-link"
              role="listitem"
              :aria-label="logo.alt ?? `logo-${idx}`"
              :target="logo.target ?? '_self'"
              rel="noopener noreferrer"
              @click.prevent="handleLogoClick(logo)"
            >
              <div
                class="logo-card"
                :title="logo.alt ?? ''"
                :style="{ 'transition-delay': `${idx * 0.05}s` }"
              >
                <img :src="logo.src" :alt="logo.alt ?? ''" loading="lazy" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

interface Logo {
  src: string;
  alt?: string;
  href?: string;
  target?: string;
}

/**
 * Props with defaults
 */
const props = withDefaults(
  defineProps<{
    background?: string;
    headerHeight?: string;
    logos?: Logo[];
    rtl?: boolean;
    brandHtml?: string;
  }>(),
  {
    background: "/images/categories.jpg",
    headerHeight: "72px",
    logos: undefined,
    rtl: false,
    brandHtml: `<h1 class="site-title">LAYSEN Valley</h1>`,
  }
);

/**
 * fallback logos
 */
const defaultLogos: Logo[] = [
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
];

const logos = computed(() =>
  props.logos?.length ? props.logos : defaultLogos
);
const background = props.background!;
const headerHeight = props.headerHeight!;
const rtl = props.rtl!;
// const brandHtml = props.brandHtml!; // Not used in the current template, but kept for completeness

/**
 * Animation State
 */
const shouldAnimate = ref(false);

onMounted(() => {
  // Use a small timeout to ensure the component is fully rendered
  // in its initial, hidden state before triggering the transition.
  setTimeout(() => {
    shouldAnimate.value = true;
  }, 50); // 50ms is enough for the DOM to settle
});

/**
 * Emit logo click event
 */
const emit = defineEmits<{
  (e: "logo-click", logo: Logo): void;
}>();
const handleLogoClick = (logo: Logo) => {
  emit("logo-click", logo);
};
</script>

<style scoped lang="scss">
.hero-showcase {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--bg-url);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
    filter: contrast(0.9) saturate(0.85);
  }

  .overlay {
    z-index: 14 !important;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
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

  .hero-inner {
    position: relative;
    z-index: 3;
    padding-top: 1rem;
    width: 100%;
  }

  .brand {
    color: #fff;
    margin-bottom: 1rem;

    .site-title {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
    }
  }

  /* Logos grid wrapper */
  .logos-wrap {
    width: 100%;
    max-height: calc(100vh - var(--header-height) - 160px);
    overflow-y: auto;
    padding: 0.5rem 0;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* Fixed 4-column grid */
  .logos-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    padding: 1rem;

    .logo-card-link {
      width: 100%;
      text-decoration: none;
      display: block;
    }

    .logo-card {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 1rem;
      width: 100%;
      aspect-ratio: 4 / 3;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(6px) saturate(120%);
      -webkit-backdrop-filter: blur(6px) saturate(120%);
      border: 1px solid rgba(255, 255, 255, 0.04);

      // 1. Initial/Hover Transition Properties
      transition: transform 220ms ease,
        // For hover
        box-shadow 220ms ease,
        // For hover
        opacity 400ms ease-out,
        // For slide-in
        transform 400ms ease-out; // For slide-in

      // 2. Initial State (Hidden and pushed down)
      opacity: 0;
      transform: translateY(20px);

      &:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 14px 34px rgba(2, 9, 10, 0.25);
      }

      img {
        max-width: 85%;
        max-height: 75%;
        object-fit: contain;
        filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.45));
      }
    }

    // 3. Final State (Visible and in place)
    &.start-animation {
      .logo-card {
        opacity: 1;
        transform: translateY(0); // Move to final resting place
      }
    }
  }

  /* Scrollbar styling */
  .logos-wrap::-webkit-scrollbar {
    width: 10px;
  }
  .logos-wrap::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
  }
  .logos-wrap::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Responsive */
  @media (max-width: 992px) {
    .logos-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .logos-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
  @media (max-width: 480px) {
    .logos-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
