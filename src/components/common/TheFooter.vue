<!-- src/components/TheFooter.vue -->
<template>
   <footer class="footer-bg py-4">
       <div class="container">
           <div class="row">
               <!-- คอลัมน์ซ้าย -->
               <div class="col-md-4 mb-3">
                   <h5 class="text-white mb-3 fs-3">ติดต่อเรา</h5>  <!-- เพิ่ม fs-3 -->
                   <div class="text-white-50 contact-text">  <!-- เพิ่ม class -->
                       <p>คณะวิทยาศาสตร์ ศรีราชา</p>
                       <p>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</p>
                       <p>199 หมู่ 6 ถ.สุขุมวิท ต.ทุ่งสุขลา</p>
                       <p>อ.ศรีราชา จ.ชลบุรี 20230</p>
                   </div>
               </div>

               <!-- คอลัมน์กลาง -->
               <div class="col-md-4 mb-3">
                   <h5 class="text-white mb-3 fs-3">ลิงก์ที่เกี่ยวข้อง</h5>  <!-- เพิ่ม fs-3 -->
                   <ul class="list-unstyled link-text">  <!-- เพิ่ม class -->
                       <li class="mb-2">
                           <a href="https://www.src.ku.ac.th" class="text-white-50 text-decoration-none">เว็บไซต์คณะวิทยาศาสตร์ ศรีราชา</a>
                       </li>
                       <li class="mb-2">
                           <a href="https://www.src.ku.ac.th/main" class="text-white-50 text-decoration-none">เว็บไซต์ มก.ศรีราชา</a>
                       </li>
                   </ul>
               </div>

               <!-- คอลัมน์ขวา -->
               <div class="col-md-4">
                   <h5 class="text-white mb-3 fs-3">ติดตามเรา</h5>  <!-- เพิ่ม fs-3 -->
                   <div class="d-flex gap-3">
                       <a href="#" class="text-white-50">
                           <i class="bi bi-facebook fs-2"></i>  <!-- เพิ่มขนาดเป็น fs-2 -->
                       </a>
                       <a href="#" class="text-white-50">
                           <i class="bi bi-youtube fs-2"></i>  <!-- เพิ่มขนาดเป็น fs-2 -->
                       </a>
                   </div>
               </div>
           </div>

           <!-- ลิขสิทธิ์ -->
           <div class="text-center text-white-50 pt-4 border-top border-secondary fs-5">  <!-- เพิ่ม fs-5 -->
               <small>&copy; 2024 คณะวิทยาศาสตร์ ศรีราชา มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</small>
           </div>
       </div>
       
   </footer>
   
</template>

<style scoped>
.footer-bg {
   background-color: #2A2D65;
}

/* เพิ่มขนาดตัวอักษรสำหรับข้อความติดต่อ */
.contact-text {
   font-size: 1.2rem;
}

/* เพิ่มขนาดตัวอักษรสำหรับลิงก์ */
.link-text {
   font-size: 1.2rem;
}

a:hover {
   opacity: 0.8;
}
</style>

เเผนภูมิทรีเเม็ป
#2c7bb6 #abd9e9 #fdae6