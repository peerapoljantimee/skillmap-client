<!-- src\components\layout\MainMenu.vue -->

<template>
  <nav class="main-menu">
    <div class="container pt-3 pb-3">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-4 col-lg-3 mb-2 mb-md-0">
          <router-link to="/" custom v-slot="{ isActive, navigate }">
            <Button
              class="p-button-rounded menu-button w-100"
              :class="{ 'p-button-outlined': !isActive, 'active': isActive }"
              @click="navigate"
            >
              <i class="pi pi-chart-line me-2"></i>
              <span>แนวโน้มงาน</span>
            </Button>
          </router-link>
        </div>
        
        <div class="col-12 col-md-4 col-lg-3 mb-2 mb-md-0">
          <router-link to="/mapping" custom v-slot="{ navigate }">
            <Button
              class="p-button-rounded menu-button w-100"
              :class="{ 'p-button-outlined': !$route.path.startsWith('/mapping'), 'active': $route.path.startsWith('/mapping') }"
              @click="navigate"
            >
              <i class="pi pi-sitemap me-2"></i>
              <span>จับคู่ทักษะ</span>
            </Button>
          </router-link>
        </div>
        
        <div class="col-12 col-md-4 col-lg-3 mb-2 mb-md-0">
          <router-link to="/admin" custom v-slot="{ navigate }">
            <Button
              class="p-button-rounded menu-button w-100"
              :class="{ 'p-button-outlined': !$route.path.startsWith('/admin'), 'active': $route.path.startsWith('/admin') }"
              @click="navigate"
            >
              <i class="pi pi-cog me-2"></i>
              <span>ผู้ดูแลระบบ</span>
            </Button>
          </router-link>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <!-- <div class="d-md-none mt-2">
        <SpeedDial 
          :model="mobileMenuItems" 
          direction="up" 
          class="mobile-speed-dial"
          :buttonClass="'p-button-outlined mobile-menu-button'"
          buttonIcon="pi pi-bars"
        />
      </div> -->
    </div>
  </nav>
</template>

<script>
import Button from 'primevue/button';
import SpeedDial from 'primevue/speeddial';
import { ref } from 'vue';

export default { 
  name: 'MainMenu',
  components: {
    Button,
    SpeedDial
  },
  setup() {
    const mobileMenuItems = ref([
      {
        label: 'แนวโน้มงาน',
        icon: 'pi pi-chart-line',
        to: '/'
      },
      {
        label: 'จับคู่ทักษะ',
        icon: 'pi pi-sitemap',
        to: '/mapping'
      },
      {
        label: 'ผู้ดูแลระบบ',
        icon: 'pi pi-cog',
        to: '/admin'
      }
    ]);
    
    return {
      mobileMenuItems
    };
  }
}
</script>

<style scoped>
.main-menu {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  z-index: 1000;
}

.menu-button {
  height: 50px;
  border-color: #2A2D65;
  color: #2A2D65;
  font-size: 1.1rem;
  font-weight: 500;
  border-width: 2px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.menu-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(42, 45, 101, 0.2);
  background-color: #f1f3ff;
  border-color: #2A2D65;
  color: #2A2D65;
}

.menu-button.active {
  background-color: #2A2D65;
  color: white;
  border-color: #2A2D65;
  box-shadow: 0 4px 8px rgba(42, 45, 101, 0.3);
}

.menu-button.active:hover {
  background-color: #20225a;
}

.menu-button:focus {
  box-shadow: 0 0 0 3px rgba(42, 45, 101, 0.3);
  outline: none;
}

.menu-button::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #2A2D65 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.5s, opacity 1s;
}

.menu-button:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

/* Mobile Menu */
.mobile-speed-dial {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

:deep(.mobile-menu-button) {
  background-color: #2A2D65;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

:deep(.p-speeddial-item) .p-button {
  background-color: #2A2D65;
  color: white;
  border: none;
}

:deep(.p-speeddial-item) .p-button:hover {
  background-color: #20225a;
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .menu-button {
    font-size: 1rem;
    height: 45px;
  }
}

@media (max-width: 576px) {
  .menu-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .main-menu {
    padding-bottom: 10px;
  }
}
</style>