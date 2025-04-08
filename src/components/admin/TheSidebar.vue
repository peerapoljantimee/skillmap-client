<!-- src\components\TheSidebar.vue -->
<template>
  <div class="sidebar-container">
    <div class="logo-container p-3">
      <a href="/admin" class="logo-content">
        <i class="pi pi-briefcase mr-2" style="font-size: 1.5rem; color: #2A2D65;"></i>
        <span class="app-name d-none d-sm-inline">จัดการประกาศงาน</span>
      </a>
    </div>
    
    <Divider />
    
    <ul class="sidebar-menu p-0">
      <li class="sidebar-item">
        <router-link to="/admin/jobposting" custom v-slot="{ isActive, navigate }">
          <a href="/admin/jobposting" class="sidebar-link" :class="{ 'active': isActive }" @click="navigate">
            <i class="pi pi-file-edit"></i>
            <span class="sidebar-text d-none d-sm-inline">รายการประกาศรับสมัครงาน</span>
          </a>
        </router-link>
      </li>

      <li class="sidebar-item">
        <router-link to="/admin/company" custom v-slot="{ isActive, navigate }">
          <a href="/admin/company" class="sidebar-link" :class="{ 'active': isActive }" @click="navigate">
            <i class="pi pi-th-large"></i>
            <span class="sidebar-text d-none d-sm-inline">บริษัท</span>
          </a>
        </router-link>
      </li>

      <li class="sidebar-item">
        <router-link to="/admin/extract-skills" custom v-slot="{ isActive, navigate }">
          <a href="/admin/extract-skills" class="sidebar-link" :class="{ 'active': isActive }" @click="navigate">
            <i class="pi pi-sparkles"></i>
            <span class="sidebar-text d-none d-sm-inline">สกัดทักษะ</span>
          </a>
        </router-link>
      </li>

      <li class="sidebar-item">
        <router-link to="/admin/add-jobposting" custom v-slot="{ isActive, navigate }">
          <a href="/admin/add-jobposting" class="sidebar-link" :class="{ 'active': isActive }" @click="navigate">
            <i class="pi pi-plus-circle"></i>
            <span class="sidebar-text d-none d-sm-inline">เพิ่มประกาศรับสมัครงาน</span>
          </a>
        </router-link>
      </li>

      <li class="sidebar-item">
        <router-link to="/admin/scraping" custom v-slot="{ isActive, navigate }">
          <a href="/admin/scraping" class="sidebar-link" :class="{ 'active': isActive }" @click="navigate">
            <i class="pi pi-download"></i>
            <span class="sidebar-text d-none d-sm-inline">นำเข้าประกาศรับสมัครงาน</span>
          </a>
        </router-link>
      </li>
    </ul>
    
    <!-- <div class="mt-auto p-3 d-none d-sm-block">
      <Card class="help-card">
        <template #content>
          <div class="help-content">
            <i class="pi pi-question-circle mb-2" style="font-size: 1.5rem;"></i>
            <h5>ต้องการความช่วยเหลือ?</h5>
            <p class="help-text">คลิกที่นี่เพื่อดูคู่มือการใช้งาน</p>
            <Button label="คู่มือช่วยเหลือ" icon="pi pi-book" class="p-button-sm p-button-outlined" />
          </div>
        </template>
      </Card>
    </div> -->
  </div>
</template>

<script>
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
  name: 'TheSidebar',
  components: {
    Divider,
    Card,
    Button
  }
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logo-container {
  padding: 1.5rem 1rem;
}

.logo-content {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.app-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2A2D65;
  margin-left: 0.5rem;
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
}

.sidebar-item {
  margin-bottom: 0.5rem;
  width: 100%;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #2A2D65;
  text-decoration: none;
  transition: all 0.3s;
}

.sidebar-link i {
  font-size: 1.2rem;
  margin-right: 0.75rem;
}

.sidebar-text {
  font-weight: 500;
}

.sidebar-link:hover {
  background-color: #e9ecef;
}

.sidebar-link.active {
  background-color: #2A2D65;
  color: white;
}

.help-card {
  background-color: #f1f5f9;
  border-radius: 8px;
  border: none;
}

.help-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.help-text {
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  color: #64748b;
}

/* ปรับปรุงการแสดงผลบนอุปกรณ์มือถือ */
@media (max-width: 768px) {
  .sidebar-link {
    justify-content: center;
  }
  
  .sidebar-link i {
    margin-right: 0;
    font-size: 1.5rem;
  }
}
</style>