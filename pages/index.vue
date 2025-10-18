<template>
  <div class="scroll-container" ref="scrollContainer" dir="rtl">
    <TheHeader />

    <section class="full-screen-section" id="section-1">
      <SectionVideo
        :videoSrc="video1"
        :isActive="activeSection === 1"
        poster="/images/laysen-Logo.svg"
      >
        <div
          class="section-content-wrapper transition-fade"
          :class="{ 'is-active': activeSection === 1 }"
          style="text-align: right"
        >
          <h1 class="display-1 fw-bold mb-4">وادي الليسن</h1>
          <p
            class="lead"
            style="max-width: 800px; margin-right: 0; margin-left: auto"
          >
            وادي الليسن هو مشروع عقاري متعدد الاستخدامات في حي أم الحمام الغربي
            بالرياض. يضم مبانٍ تجارية وسكنية، بالإضافة إلى مساحات عامة ومناطق
            متنوعة مثل المطاعم والكافيتريات وخدمات العناية الشخصية. ويهدف ليكون
            وجهة متكاملة تجمع بين العمل والترفيه في مكان واحد.
          </p>
        </div>
      </SectionVideo>
    </section>

    <section class="full-screen-section" id="section-2">
      <SectionVideo
        :videoSrc="video2"
        :isActive="activeSection === 2"
        poster="/images/laysen-Logo.svg"
      >
        <div
          class="section-content-wrapper transition-slide"
          :class="{ 'is-active': activeSection === 2 }"
          style="text-align: right"
        >
          <h1 class="display-1 fw-bold mb-4">رؤية وادي الليسن</h1>
          <p
            class="lead"
            style="max-width: 900px; margin-right: 0; margin-left: auto"
          >
            رؤية وادي الليسن بالرياض تتمثل في كونه مشروعاً متعدد الاستخدامات
            يهدف إلى تطوير منطقة حي أم الحمام الغربي لتصبح مركزاً حيوياً للأعمال
            والثقافة والترفيه، انسجاماً مع رؤية المملكة 2030. يجمع الوادي بين
            المساحات الخضراء، المسارات الهوائية والمشاة، والمباني الحديثة
            المستوحاة من العمارة السلمانية، بالإضافة إلى مراكز تجارية عالمية
            ومكاتب لأكثر من 50 شركة متعددة الجنسيات.
          </p>
        </div>
      </SectionVideo>
    </section>

    <section class="full-screen-section" id="section-3">
      <HeroLogos headerHeight="72px" :rtl="true" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SectionVideo from "~/components/SectionVideo.vue";
import TheHeader from "~/components/Header.vue";
import HeroLogos from "~/components/HeroLogos.vue";

// Define video sources (Placeholder: You must add these files to your /public/videos folder)
const video1 = "/videos/firstvid.mp4";
const video2 = "/videos/secondvid.mp4";

// State for the currently active section (1, 2, 3, 4)
const activeSection = ref(1);
const scrollContainer = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

// Intersection Observer Callback to update activeSection
const handleIntersection: IntersectionObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Logic to determine which section is most visible
      const sectionId = entry.target.id;
      const sectionNumber = parseInt(sectionId.split("-")[1]);
      activeSection.value = sectionNumber;
    }
  });
};

onMounted(() => {
  // 1. Get all section elements
  const sectionRefs = Array.from(
    document.querySelectorAll(".full-screen-section")
  );

  // 2. Initialize the Intersection Observer
  observer = new IntersectionObserver(handleIntersection, {
    root: scrollContainer.value,
    // Trigger when 50% of the section is visible
    threshold: 0.5,
  });

  // 3. Start observing each section
  sectionRefs.forEach((section) => {
    observer?.observe(section);
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>
<style lang="scss" scoped></style>
