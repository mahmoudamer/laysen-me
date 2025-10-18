<template>
  <div
    class="hero-showcase"
    :dir="rtl ? 'rtl' : 'ltr'"
    :style="{
      '--bg-url': `url(${background})`,
      '--header-height': headerHeight,
      'object-fit': 'cover',
    }"
    role="region"
    aria-label="Hero showcase"
  >
    <div class="overlay">
      <div class="container-fluid hero-inner">
        <!-- Optional center content: logo + nav tabs -->
        <div class="hero-top text-center">
          <nav
            class="tabs d-inline-flex align-items-center"
            role="tablist"
            aria-label="Sections"
          >
            <button
              v-for="(t, idx) in tabs"
              :key="t.key ?? idx"
              class="tab-btn btn"
              :class="{ active: activeTab === (t.key ?? idx) }"
              role="tab"
              :aria-selected="activeTab === (t.key ?? idx)"
              @click="selectTab(t.key ?? idx)"
            >
              {{ t.label }}
            </button>
          </nav>
        </div>

        <!-- Logos row -->
        <div class="logos-wrap mt-5">
          <div class="logos-scroll">
            <a
              v-for="(logo, idx) in logos"
              :key="logo.alt ?? idx"
              :href="logo.href ?? '#'"
              class="logo-card-link"
              :aria-label="logo.alt ?? `logo-${idx}`"
              :target="logo.target ?? '_self'"
              v-on:click="openPopup"
            >
              <div class="logo-card">
                <img :src="logo.src" :alt="logo.alt ?? 'logo'" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <LocationPopup
      v-model:show="showPopup"
      :title="starbucksData.title"
      :description="starbucksData.description"
      :logo-src="starbucksData.logoSrc"
      :address="starbucksData.address"
      :phone="starbucksData.phone"
      :map-src="starbucksData.mapSrc"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import LocationPopup from "~/components/LocationPopup.vue";

interface Tab {
  label: string;
  key?: string | number;
}

interface Logo {
  src: string;
  alt?: string;
  href?: string;
  target?: string;
}

/**
 * Props
 */
const props = defineProps<{
  background?: string;
  headerHeight?: string;
  tabs?: Tab[];
  logos?: Logo[];
  initialTab?: string | number;
  rtl?: boolean;
  brandHtml?: string;
}>();

const background = "/images/herologos.jpg";
const headerHeight = "72px"; // height of your fixed header
const tabs = [
  { label: "المطاعم", key: "restaurants" },
  { label: "الشركات", key: "companies" },
  { label: "المتاجر", key: "stores" },
];
const companyLogos = [
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
];
const restaurantsLogos = [
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
];
const storesLogos = [
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },

  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
];
const showPopup = ref(false);
const openPopup = () => {
  showPopup.value = true;
};
const starbucksData = ref({
  title: "ستاربكس كافيه",
  description:
    "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.",
  logoSrc: "/images/slide-1.svg", // Using a real URL
  address: "مبنى B الدور الأول، محل رقم 345A",
  phone: "0506757887",
  mapSrc: "/images/map-placeholder.png", // Using a placeholder for the map image
});

const logos = computed<Logo[]>(() => {
  switch (activeTab.value) {
    case "companies":
      return [...companyLogos];
    case "restaurants":
      return [...restaurantsLogos];
    case "stores":
      return [...storesLogos];
    default:
      return [...companyLogos];
  }
});

const initialTab = props.initialTab ?? tabs[0]?.key ?? 0;
const rtl = props.rtl ?? false;
const brandHtml =
  props.brandHtml ?? `<h1 class="site-title">LAYSEN Valley</h1>`;

/** reactive state */
const activeTab = ref<string | number>(initialTab);

function selectTab(key: string | number) {
  activeTab.value = key;
}

/** keep activeTab in sync if parent changes initialTab (optional) */
watch(
  () => props.initialTab,
  (v) => {
    if (v !== undefined) activeTab.value = v;
  }
);
</script>

<style scoped lang="scss">
.hero-showcase {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center; /* center vertically */
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

  .hero-inner {
    position: relative;
    z-index: 3;
    padding-top: 1rem;
    padding-bottom: 2rem;
  }

  .hero-top {
    .brand {
      .site-title {
        font-family: "Segoe UI", Roboto, system-ui, -apple-system;
        color: #fff;
        font-weight: 600;
        margin: 0;
        font-size: 1.6rem;
        letter-spacing: 0.6px;
      }
    }

    .tabs {
      gap: 1.5rem;
      .tab-btn {
        --pill-bg: rgba(255, 255, 255, 0.3);
        background: var(--pill-bg);
        color: #fff;
        border-radius: 28px;
        padding: 0.55rem 1.15rem;
        font-size: 0.95rem;
        border: none;
        transition: all 160ms ease;
        box-shadow: none;
        backdrop-filter: blur(6px);
        &:hover {
          transform: translateY(-2px);
        }
        &.active {
          background: #aa986a;
          color: #fff;
        }
      }
    }
  }

  /* Logos row */
  .logos-wrap {
    margin-top: 1.6rem;
    width: 100%;
    display: flex;
    justify-content: center;
    .logos-scroll {
      display: flex;
      gap: 1.2rem;
      align-items: center;
      overflow-x: auto;
      padding: 1rem 0.2rem;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
      /* Safari and Chrome */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      /* For Chrome, Safari, and newer Edge/Opera */
      &::-webkit-scrollbar {
        display: none;
      }
      .logo-card-link {
        text-decoration: none;
        display: inline-block;
        flex: 0 0 auto;
        width: 220px;
        max-width: 220px;
      }

      .logo-card {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 14px;
        padding: 1.25rem;
        height: 200px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 220ms ease, box-shadow 220ms ease;
        backdrop-filter: blur(8px) saturate(120%);
        -webkit-backdrop-filter: blur(8px) saturate(120%);
        border: 1px solid rgba(255, 255, 255, 0.04);

        img {
          max-width: 90%;
          max-height: 80%;
          object-fit: contain;
          filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.45));
        }

        &:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 18px 40px rgba(2, 9, 10, 0.25);
        }
      }
    }
  }

  /* small screens */
  @media (max-width: 768px) {
    .hero-inner {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .logo-card {
      height: 120px;
    }
  }
}
</style>
