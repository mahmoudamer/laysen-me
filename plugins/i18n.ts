import { createI18n } from "vue-i18n";
import ar from "~/locales/ar.json";
import en from "~/locales/en.json";

const messages = {
  ar,
  en,
};

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: "ar",
    fallbackLocale: "ar",
    messages,
  });

  nuxtApp.vueApp.use(i18n);

  return {
    provide: {
      i18n: i18n.global,
    },
  };
});
