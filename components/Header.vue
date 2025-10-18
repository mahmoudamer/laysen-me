<template>
  <header class="site-header fixed-top">
    <div class="container-fluid">
      <div class="header-container">
        <nav class="nav d-none d-lg-flex">
          <NuxtLink to="/resturants">المطاعم</NuxtLink>
          <NuxtLink to="/companies">الشركات</NuxtLink>
          <NuxtLink to="/stores">المتاجر</NuxtLink>
        </nav>

        <NuxtLink to="/" class="logo">
          <img src="/images/laysen-Logo.svg" alt="Laysen Valley Logo" />
        </NuxtLink>

        <div class="nav-right d-none d-lg-flex align-items-center">
          <NuxtLink to="/contact">تواصل معنا</NuxtLink>
          <button class="lang">En</button>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/images/f.svg" alt="facebook" class="social-icon" />
          </a>
        </div>

        <button
          class="btn d-lg-none menu-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="mobileMenu"
    aria-labelledby="mobileMenuLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="mobileMenuLabel">القائمة</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <nav class="mobile-nav">
        <NuxtLink to="/resturants" data-bs-dismiss="offcanvas"
          >المطاعم</NuxtLink
        >
        <NuxtLink to="/companies" data-bs-dismiss="offcanvas">الشركات</NuxtLink>
        <NuxtLink to="/stores" data-bs-dismiss="offcanvas">المتاجر</NuxtLink>
        <hr />
        <NuxtLink to="/contact" data-bs-dismiss="offcanvas"
          >تواصل معنا</NuxtLink
        >
        <button class="lang">Change to English</button>
        <a href="#" target="_blank" rel="noopener noreferrer"> Facebook </a>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.site-header {
  // Removed fixed positioning from here, added .fixed-top bootstrap class instead
  z-index: 900;
  padding: 1.5rem 2rem;
  background: transparent;
  transition: background-color 0.3s ease; // For adding a background on scroll later

  .header-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo img {
    height: 110px; // Example height
  }

  // Styles for both desktop navs
  .nav,
  .nav-right {
    display: flex;
    align-items: center;
    gap: 25px; // Use gap for spacing

    a,
    .lang {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;

      &:hover {
        color: #fff;
      }
    }

    .social-icon {
      height: 20px;
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
    }
  }

  .lang {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  // Mobile toggler button
  .menu-toggler {
    color: #fff;
    border: none;
    padding: 0;
    &:focus {
      box-shadow: none;
    }
  }
}

// Offcanvas styles
.offcanvas {
  background-color: #1a1a1a; // Dark background for the menu
  color: #fff;

  .offcanvas-header {
    border-bottom: 1px solid #444;
  }

  .btn-close {
    background-color: #fff; // Make close button visible on dark background
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: 1.2rem;

    a,
    .lang {
      color: #eee;
      text-decoration: none;
    }

    .lang {
      background: none;
      border: none;
      color: #eee;
      text-align: right;
      padding: 0;
    }

    hr {
      border-color: #444;
    }
  }
}
</style>
