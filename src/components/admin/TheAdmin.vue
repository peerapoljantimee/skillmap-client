<!-- src\components\TheAdmin.vue -->

<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <TheSidebar />
      </div>
      <!-- ส่วนของเนื้อหา -->
      <div class="col py-3">
        <h1 class="fw-bold h1 mb-4" style="color: #2A2D65;">ระบบจัดการประกาศรับสมัครงาน</h1>
        
        <div class="card mb-4">
          <div class="card-body">
            <h4 class="mb-3">ยินดีต้อนรับสู่ระบบจัดการประกาศรับสมัครงาน</h4>
            <p class="lead">
              ระบบนี้ช่วยให้ผู้ดูแลระบบสามารถควบคุมและจัดการประกาศรับสมัครงานทั้งหมดได้อย่างมีประสิทธิภาพ 
              สามารถเพิ่ม แก้ไข อนุมัติ และลบประกาศงานต่างๆ ได้จากศูนย์กลางเดียว
            </p>
            <hr>
            <h5 class="mt-4">ความสามารถหลักของระบบ</h5>
            <!-- <ul>
              <li><strong>การจัดการประกาศงาน</strong> - เพิ่ม แก้ไข ลบ และเปลี่ยนสถานะประกาศงาน</li>
              <li><strong>การตรวจสอบและอนุมัติ</strong> - ตรวจสอบและอนุมัติประกาศงานที่รอการพิจารณา</li>
              <li><strong>การจัดการทักษะ</strong> - จัดการทักษะที่เกี่ยวข้องกับตำแหน่งงานต่างๆ</li>
              <li><strong>การวิเคราะห์ข้อมูล</strong> - แสดงข้อมูลเชิงลึกเกี่ยวกับประกาศงาน สถิติการเข้าชม และความนิยม</li>
              <li><strong>การส่งออกข้อมูล</strong> - ส่งออกข้อมูลเพื่อการวิเคราะห์หรือรายงาน</li>
            </ul> -->
            
            <h5 class="mt-4">คำแนะนำการใช้งาน</h5>
            <ol>
              <li>ใช้เมนูด้านซ้ายเพื่อนำทางไปยังส่วนต่างๆ ของระบบ</li>
              <li>ตรวจสอบประกาศงานใหม่ที่รอการอนุมัติเป็นประจำ</li>
              <li>ตรวจสอบเนื้อหาของประกาศงานให้ถูกต้องก่อนอนุมัติ</li>
              <li>ระมัดระวังการลบประกาศงานเนื่องจากไม่สามารถเรียกคืนได้</li>
              <li>อัปเดตหมวดหมู่และทักษะให้ทันสมัยเพื่อให้การค้นหาและการจับคู่ทักษะมีประสิทธิภาพ</li>
            </ol>
          </div>
        </div>
        
        <div class="alert alert-info">
          <div class="d-flex">
            <div class="me-3">
              <i class="pi pi-info-circle" style="font-size: 2rem;"></i>
            </div>
            <div>
              <h5>เริ่มใช้งานระบบ</h5>
              <p>เลือกเมนู "จัดการประกาศงาน" ในแถบเมนูด้านซ้ายเพื่อเริ่มต้นการจัดการประกาศรับสมัครงาน</p>
            </div>
          </div>
        </div>
      </div>


  </div>
</div>
</template>

<script>
import TheSidebar from "@/components/admin/TheSidebar.vue";

export default {
  name: 'TheAdmin',
  components: { 
    TheSidebar,
  }
}
</script>

<style scoped>
</style>

