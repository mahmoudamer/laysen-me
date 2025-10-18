<template>
  <div dir="rtl">
    <TheHeader />
    <section
      class="full-screen-section contact-page"
      id="section-3"
      :dir="rtl ? 'rtl' : 'ltr'"
      :style="{
        '--bg-url': `url(${background})`,
        '--header-height': headerHeight,
        'object-fit': 'cover',
      }"
    >
      <div class="overlay"></div>

      <ContactUsForm />
    </section>
  </div>
</template>

<script setup>
import ContactUsForm from "~/components/contactUsForm.vue";
import TheHeader from "~/components/Header.vue";

const background = "/images/herologos.jpg";
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
