<template>
  <div
    class="modal fade location-popup"
    ref="modal"
    tabindex="-1"
    aria-hidden="true"
    dir="rtl"
  >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-body p-4 p-md-5">
          <div class="container-fluid">
            <div class="row">
              <div class="col-3">
                <div class="popup-logo-container mt-4 mt-md-0">
                  <img :src="logoSrc" alt="Logo" class="popup-logo img-fluid" />
                </div>
              </div>
              <div class="col-9">
                <div class="row align-items-center mb-4">
                  <div class="col-md-12 text-center text-md-end">
                    <h2 class="popup-title mb-3">{{ title }}</h2>
                    <p class="popup-description">{{ description }}</p>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-12">
                    <div class="popup-info">
                      <i class="bi bi-geo-alt-fill"></i>
                      <span>{{ address }}</span>
                    </div>
                    <div class="popup-info">
                      <i class="bi bi-telephone-fill"></i>
                      <span>{{ phone }}</span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <img :src="mapSrc" alt="Location Map" class="popup-map" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// ❌ REMOVED: import { Modal } from 'bootstrap';
// Since you're using a CDN, it won't be in node_modules.

// --- Props, Emits, Refs are the same ---
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: String,
  description: String,
  logoSrc: { type: String, default: "/images/slide-1.svg" },
  address: String,
  phone: String,
  mapSrc: { type: String, default: "/images/map-placeholder.png" },
});

const emit = defineEmits(["update:show"]);
const modal = ref(null);
let modalInstance = null;

// --- Logic ---
onMounted(() => {
  if (modal.value) {
    // 💡 FIX APPLIED: Access the Modal constructor from the global window object.
    // The CDN loads the Bootstrap JS which attaches its components to 'window.bootstrap'.
    const Modal = window.bootstrap.Modal;

    // Initialize the Bootstrap modal instance
    if (Modal) {
      modalInstance = new Modal(modal.value);

      // When Bootstrap hides the modal (e.g., clicking backdrop, pressing ESC),
      // we must emit an event to update the parent's 'show' variable.
      modal.value.addEventListener("hidden.bs.modal", () => {
        emit("update:show", false);
      });
    } else {
      console.error(
        "Bootstrap Modal is not available. Ensure the Bootstrap JS CDN link is loaded."
      );
    }
  }
});

// Watch for changes in the 'show' prop
watch(
  () => props.show,
  (newVal) => {
    if (!modalInstance) return;

    if (newVal) {
      modalInstance.show(); // Show the modal if prop.show becomes true
    } else {
      modalInstance.hide(); // Hide the modal if prop.show becomes false
    }
  }
);

// Function to be called by our custom close button
const close = () => {
  emit("update:show", false);
};
</script>

<style scoped>
/* 'scoped' means these styles will only apply to this component.
  We use :deep() to style Bootstrap's modal classes from within this component.
*/

:deep(.modal-backdrop.show) {
  opacity: 0.65; /* Darker backdrop */
}

.location-popup .modal-dialog {
  max-width: 600px;
}

.location-popup .modal-content {
  background: rgba(255, 255, 255, 0.25) !important;
  color: #e0e0e0;
  border: none;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(34px);
}

/* --- Component-Specific Styles --- */
.popup-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-logo {
  max-width: 100%;
  height: auto;
  border-radius: 50%; /* Circular logo */
  background-color: white; /* White background for the logo */
  padding: 5px;
}

.popup-title {
  font-weight: 700;
  color: #ffffff;
  font-size: 2rem;
}

.popup-description {
  line-height: 1.6;
}

.popup-info {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between icon and text */
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #ffffff;
}

.popup-info i {
  font-size: 1.2rem;
  color: #ffffff;
}

.popup-map {
  width: 100%;
  border-radius: 0.75rem; /* Rounded corners for map */
  object-fit: cover;
}
</style>
