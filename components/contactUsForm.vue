<template>
  <div class="contact-form-container">
    <div class="container-fluid" style="padding-top: 6rem">
      <div class="row g-4 pt-4">
        <!-- Left Column: Contact Form -->
        <div class="col-lg-6">
          <div class="contact-form-wrapper">
            <form @submit.prevent="submitForm" class="contact-form">
              <!-- Name Field -->
              <div class="form-group mb-3">
                <label :for="'name-' + $i18n.locale" class="form-label">
                  {{ $t("name") }}
                </label>
                <input
                  :id="'name-' + $i18n.locale"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  :placeholder="$t('name')"
                  required
                />
              </div>

              <!-- Email and Phone Fields -->
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label :for="'email-' + $i18n.locale" class="form-label">
                    {{ $t("email") }}
                  </label>
                  <input
                    :id="'email-' + $i18n.locale"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    :placeholder="$t('email')"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label :for="'phone-' + $i18n.locale" class="form-label">
                    {{ $t("phone") }}
                  </label>
                  <input
                    :id="'phone-' + $i18n.locale"
                    v-model="form.phone"
                    type="tel"
                    class="form-control"
                    :placeholder="$t('phone')"
                    required
                  />
                </div>
              </div>

              <!-- Message Field -->
              <div class="form-group mb-4">
                <label :for="'message-' + $i18n.locale" class="form-label">
                  {{ $t("message") }}
                </label>
                <textarea
                  :id="'message-' + $i18n.locale"
                  v-model="form.message"
                  class="form-control"
                  rows="5"
                  :placeholder="$t('message')"
                  required
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary w-100 submit-btn">
                {{ $t("submit") }}
              </button>
            </form>
          </div>
        </div>

        <!-- Right Column: Contact Information and Social Media -->
        <div class="col-lg-6">
          <div class="contact-info-wrapper">
            <h2 class="contact-title">{{ $t("contact_us") }}</h2>
            <p class="contact-subtitle">{{ $t("send_inquiry") }}</p>

            <!-- Social Media Icons -->
            <div class="social-media-icons">
              <a
                href="#"
                class="social-icon"
                :title="$t('facebook')"
                aria-label="$t('facebook')"
              >
                <img
                  src="/images/fb.svg"
                  alt="Facebook"
                  class="social-icon-img"
                />
              </a>
              <a
                href="#"
                class="social-icon"
                :title="$t('instagram')"
                aria-label="$t('instagram')"
              >
                <img
                  src="/images/insta.svg"
                  alt="Instagram"
                  class="social-icon-img"
                />
              </a>
              <a
                href="#"
                class="social-icon"
                :title="$t('youtube')"
                aria-label="$t('youtube')"
              >
                <img
                  src="/images/u-tube.svg"
                  alt="YouTube"
                  class="social-icon-img"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Form data
const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

// Form submission handler
const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log("Form submitted:", form.value);

  // Reset form after submission
  form.value = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  // You can add success/error handling here
  alert("Form submitted successfully!");
};
</script>

<style scoped>
.contact-form-container {
  padding: 4rem 3rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 15;
}

.contact-form-wrapper {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-form {
  color: white;
}

.form-label {
  color: white;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-control {
  background: white;
  border: 2px solid transparent;
  border-radius: 10px;
  /* padding: 0.75rem 1rem; */
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  background: white;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: none;
}

.form-control::placeholder {
  color: #6c757d;
}

.submit-btn {
  background: #007bff;
  border: none;
  border-radius: 10px;
  /* padding: 0.875rem 1.5rem; */
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white !important;
}

.submit-btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}

.contact-info-wrapper {
  padding: 2rem 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.contact-title {
  color: white;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.contact-subtitle {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.9;
}

.social-media-icons {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.social-icon-img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1); /* Makes the icons white */
  transition: all 0.3s ease;
}

.social-icon:hover .social-icon-img {
  filter: brightness(0) invert(0); /* Makes the icons black on hover */
}

/* RTL Support */
[dir="rtl"] .contact-info-wrapper {
  align-items: flex-end;
  text-align: right;
}

[dir="rtl"] .social-media-icons {
  flex-direction: row-reverse;
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .contact-form-container {
    padding: 2rem 0;
  }

  .contact-form-wrapper {
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .contact-info-wrapper {
    padding: 1rem 0;
    text-align: center;
    align-items: center;
  }

  .contact-title {
    font-size: 2.5rem;
  }

  .contact-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 767.98px) {
  .contact-form-wrapper {
    padding: 1.5rem;
  }

  .contact-title {
    font-size: 2rem;
  }

  .contact-subtitle {
    font-size: 1rem;
  }

  .social-media-icons {
    gap: 1rem;
  }

  .social-icon {
    width: 45px;
    height: 45px;
  }

  .social-icon-img {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 575.98px) {
  .contact-form-wrapper {
    padding: 1rem;
    border-radius: 15px;
  }

  .contact-title {
    font-size: 1.75rem;
  }

  .form-control {
    padding: 0.625rem 0.875rem;
  }

  .submit-btn {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
}
</style>
