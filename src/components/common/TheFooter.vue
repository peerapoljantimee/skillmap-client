<!-- src/components/TheFooter.vue -->
<template>
   <footer class="footer-bg py-5">
       <div class="container">
           <div class="row align-items-center justify-content-between">
               <!-- คอลัมน์ซ้าย -->
               <div class="col-md-5 mb-4 mb-md-0">
                   <h5 class="text-white mb-4 fs-3 fw-bold">เกี่ยวกับเรา</h5>
                   <div class="text-white-50 contact-text">
                       <p class="mb-3">SkillMap เป็นแพลตฟอร์มอัจฉริยะสำหรับการวิเคราะห์ตลาดแรงงาน พร้อมระบบจับคู่ทักษะอัตโนมัติ ที่เชื่อมโยงความสามารถของคุณกับตำแหน่งงานที่เหมาะสม เพื่อโอกาสในการพัฒนาอาชีพอย่างตรงจุด</p>
                       <div class="footer-logo mt-4">
                           <span class="text-white fs-2 fw-bold">Skill<span class="text-accent">Map</span></span>
                       </div>
                   </div>
               </div>

               <!-- คอลัมน์ขวา -->
               <div class="col-md-5">
                   <h5 class="text-white mb-4 fs-3 fw-bold">ติดตามโปรเจค</h5>
                   <ul class="list-unstyled github-links mb-0">
                       <li class="mb-3">
                           <a href="https://github.com/peerapoljantimee/skillmap-server" class="text-white-50 text-decoration-none d-flex align-items-center github-link p-2 rounded">
                               <div class="icon-container me-3 d-flex justify-content-center align-items-center">
                                   <i class="bi bi-github fs-2"></i>
                               </div>
                               <div>
                                   <span class="d-block fw-medium">skillmap-server</span>
                                   <small class="d-block text-white-50">เซิร์ฟเวอร์สำหรับ Skill Map</small>
                               </div>
                           </a>
                       </li>
                       <li>
                           <a href="https://github.com/peerapoljantimee/skillmap-client" class="text-white-50 text-decoration-none d-flex align-items-center github-link p-2 rounded">
                               <div class="icon-container me-3 d-flex justify-content-center align-items-center">
                                   <i class="bi bi-github fs-2"></i>
                               </div>
                               <div>
                                   <span class="d-block fw-medium">skillmap-client</span>
                                   <small class="d-block text-white-50">ส่วนติดต่อผู้ใช้สำหรับ Skill Map</small>
                               </div>
                           </a>
                       </li>
                   </ul>
               </div>
           </div>

           <!-- ลิขสิทธิ์ -->
           <div class="text-center text-white-50 pt-4 mt-4 border-top border-secondary">
               <small class="copyright">&copy; 2024 Skill Map Project. All rights reserved.</small>
           </div>
       </div>
   </footer>
</template>

<style scoped>

.footer-bg {
   background-color: #2A2D65;
   box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
}

.contact-text {
   font-size: 1.1rem;
   line-height: 1.6;
}

.github-links {
   font-size: 1.1rem;
}

.github-link {
   transition: all 0.3s ease;
   border: 1px solid transparent;
}

.github-link:hover {
   background-color: rgba(171, 217, 233, 0.1);
   border-color: rgba(171, 217, 233, 0.3);
   color: #fff !important;
   transform: translateY(-2px);
}

.icon-container {
   width: 48px;
   height: 48px;
}

.text-accent {
   color: #abd9e9;
}

.copyright {
   font-size: 0.95rem;
}

.footer-logo {
   position: relative;
}

/* ลักษณะเส้นใต้ตามแนวราบ */
.footer-logo:after {
   content: '';
   position: absolute;
   bottom: -10px;
   left: 0;
   width: 80px;
   height: 3px;
   background: linear-gradient(90deg, #2c7bb6, #abd9e9);
   border-radius: 3px;
}
</style>