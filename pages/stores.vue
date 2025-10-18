<template>
  <div dir="rtl">
    <TheHeader />
    <section
      class="full-screen-section contact-page"
      id="section-3"
      :dir="rtl ? 'rtl' : 'ltr'"
    >
      <div class="overlay"></div>

      <CategoryComponent :logos="companyLogos" @logo-click="openPopup" />
    </section>

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

<script setup>
import TheHeader from "~/components/Header.vue";
import LocationPopup from "~/components/LocationPopup.vue";

const background = "/images/categories.jpg";
const companyLogos = [
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-1.svg", alt: "Logo 1" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-3.svg", alt: "Logo 3" },
  { src: "/images/slide-4.svg", alt: "Logo 4" },
  { src: "/images/slide-2.svg", alt: "Logo 2" },
];

// All the data for the popup, kept neatly in one object
const starbucksData = ref({
  title: "ستاربكس كافيه",
  description:
    "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.",
  logoSrc: "/images/slide-1.svg", // Using a real URL
  address: "مبنى B الدور الأول، محل رقم 345A",
  phone: "0506757887",
  mapSrc: "/images/map-placeholder.png", // Using a placeholder for the map image
});

const showPopup = ref(false);

// Function to open the popup
const openPopup = () => {
  showPopup.value = true;
};

// Page metadata
useHead({
  title: "Contact Us - Laysen",
  meta: [
    {
      name: "description",
      content:
        "Get in touch with Laysen. Send us your inquiry and our team will contact you.",
    },
  ],
});
</script>

<style scoped>
.contact-page {
  background-color: #808080;
  min-height: 100vh;

  .overlay {
    z-index: 14 !important;
    position: absolute;
    inset: 0;
    pointer-events: none;
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
      rgba(2, 58, 56, 0.3) 60%,
      rgba(2, 58, 56, 0.4) 70%,
      rgba(2, 58, 56, 0.7) 80%,
      rgba(2, 58, 56, 0.9) 90%,
      rgba(2, 58, 56, 1) 100%
    );
  }
}
</style>
