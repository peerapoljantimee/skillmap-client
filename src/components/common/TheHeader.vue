<!-- src\components\common\TheHeader.vue -->

<template>
  <header class="header-container shadow-sm">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between py-3">
        <!-- Logo และชื่อเว็บไซต์ -->
        <div class="d-flex align-items-center">
          <a href="/" class="logo-link">
            <img :src="logo" alt="Skill-Job Matcher" class="logo-image">
          </a>
          <div class="ms-4 d-none d-md-block vertical-divider"></div>
          <div class="ms-4">
            <h1 class="site-title fw-bold mb-0">วิเคราะห์แนวโน้มอาชีพและการจับคู่ทักษะ</h1>
          </div>
        </div>
        
        <!-- ส่วนขวาของเฮดเดอร์ - สำหรับอนาคต เช่น การค้นหา หรือปุ่มเข้าสู่ระบบ -->
        <!-- <div class="d-none d-lg-flex align-items-center">
          <Button v-tooltip.bottom="'เกี่ยวกับเรา'" icon="pi pi-info-circle" class="p-button-rounded p-button-text p-button-lg" />
          <Button v-tooltip.bottom="'ติดต่อเรา'" icon="pi pi-envelope" class="p-button-rounded p-button-text p-button-lg ms-2" />
        </div> -->
      </div>
    </div>
    
    <!-- เมนูหลัก - เรียกใช้คอมโพเนนต์ MainMenu ที่มีอยู่แล้ว -->
    <MainMenu />
  </header>
</template>


<script>
import MainMenu from '@/components/layout/MainMenu.vue'
import logo from '@/assets/Skill-Job Matcher Logo Design.png'
import Button from 'primevue/button'
import Tooltip from 'primevue/tooltip'

export default {
  name: 'TheHeader',
  components: {
    MainMenu,
    Button
  },
  directives: {
    tooltip: Tooltip
  },
  data() {
    return {
      logo
    };
  }
}
</script>

<style scoped>
.header-container {
  background-color: #ffffff;
  color: #2A2D65;
}

.logo-link {
  display: block;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-image {
  width: 80px;
  height: auto;
  object-fit: contain;
}

.vertical-divider {
  height: 40px;
  width: 2px;
  background-color: #2A2D65;
  opacity: 0.5;
}

.site-title {
  font-size: 1.75rem;
  color: #2A2D65;
  line-height: 1.2;
  position: relative;
}

/* Animation for site title */
.site-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #2A2D65;
  transition: width 0.5s ease;
}

.site-title:hover::after {
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .site-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .site-title {
    font-size: 1.25rem;
  }
  
  .logo-image {
    width: 70px;
  }
}

@media (max-width: 576px) {
  .site-title {
    font-size: 1rem;
  }
  
  .logo-image {
    width: 60px;
  }
}
</style>