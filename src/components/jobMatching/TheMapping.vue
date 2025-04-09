<!-- src\components\TheMapping.vue -->
<template>
  <div class="container py-4 min-vh-100">
    <h1 class="fw-bold text-center mb-4" style="color: #2A2D65;">Skill Mapping</h1>
    
    <div class="row justify-content-center">
      <!-- เเบบฟอร์มกรองข้อมูลจับคู่ทักษะ -->
      <div class="col-md-5">
        <div class="card p-4 mb-4">
          <h4 class="mb-3">เลือกหมวดหมู่และทักษะ</h4>
          
          <!-- Select สำหรับกรอง sub_category -->
          <div class="mb-4 ">
            <label class="form-label fw-bold">
              <span v-if="searchJobsSubmitted && !selectedSubCategory" class="text-danger">หมวดหมู่งานย่อย (จำเป็นต้องเลือก)</span>
              <span v-else>หมวดหมู่งานย่อย</span>
            </label>
            <Select v-model="selectedSubCategory" 
              :options="subCategories" 
              optionLabel="name" 
              filter 
              :loading="subCategoriesLoading" 
              :invalid="searchJobsSubmitted && !selectedSubCategory"
              placeholder="เลือกหมวดหมู่งานย่อย" class="w-100" 
              />
          </div>
          
          <!-- MultiSelect สำหรับ Hard Skills -->
          <div class="mb-3">
            <label class="form-label fw-bold">
              <span v-if="searchJobsSubmitted && selectedHardSkills.length === 0 && selectedSoftSkills.length === 0" class="text-danger">Hard Skills (จำเป็นต้องเลือก)</span>
              <span v-else>Hard Skills</span>
            </label>
              <MultiSelect v-model="selectedHardSkills" 
                display="chip" 
                :options="hardSkills" 
                optionLabel="name"
                filter 
                placeholder="เลือก Hard Skills" 
                :maxSelectedLabels="3" 
                class="w-100"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :loading="hardSkillsLoading" 
                :invalid="searchJobsSubmitted && selectedHardSkills.length === 0 && selectedSoftSkills.length === 0"
                />
          </div>
          
          <!-- MultiSelect สำหรับ Soft Skills -->
          <div class="mb-3">
            <label class="form-label fw-bold">
              <span v-if="searchJobsSubmitted && selectedHardSkills.length === 0 && selectedSoftSkills.length === 0" class="text-danger">Soft Skills (จำเป็นต้องเลือก)</span>
              <span v-else>Soft Skills</span>
            </label>
            <MultiSelect v-model="selectedSoftSkills" 
                display="chip" 
                :options="softSkills" 
                optionLabel="name"
                filter 
                placeholder="เลือก Soft Skills" 
                :maxSelectedLabels="3" 
                class="w-100"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :loading="softSkillsLoading"
                :invalid="searchJobsSubmitted && selectedHardSkills.length === 0 && selectedSoftSkills.length === 0" 
                />     
          </div>
          
          <div class="d-flex justify-content-end mt-3">
            <Button label="ค้นหา" icon="pi pi-search" class="p-button-primary" @click="searchJobs" :loading="searchLoading" />
          </div>
        </div>
        
        <!-- แสดงสรุปทักษะที่เลือก (Hard Skills) -->
        <div v-if="selectedHardSkills && selectedHardSkills.length > 0" class="card p-3 mb-3">
          <h5>Hard Skills ที่คุณเลือก</h5>
          <div class="d-flex flex-wrap gap-2 mt-2">
            <Chip v-for="skill in selectedHardSkills" :key="skill.code" 
              :label="skill.name" :removable="true" @remove="removeHardSkill(skill)" />
          </div>
        </div>
        
        <!-- แสดงสรุปทักษะที่เลือก (Soft Skills) -->
        <div v-if="selectedSoftSkills && selectedSoftSkills.length > 0" class="card p-3 mb-4">
          <h5>Soft Skills ที่คุณเลือก</h5>
          <div class="d-flex flex-wrap gap-2 mt-2">
            <Chip v-for="skill in selectedSoftSkills" :key="skill.code" 
              :label="skill.name" :removable="true" @remove="removeSoftSkill(skill)" />
          </div>
        </div>
      </div>
      
      <!-- เเสดงประกาศรับสมัครงาน -->
      <div class="col-md-7">
        <div class="card p-3">
          <h4 class="mb-3">งานที่ตรงกับคุณสมบัติ {{ jobs.length }} รายการ</h4>
          <div class="card">
            <!-- แสดงสถานะกำลังโหลด -->
            <div v-if="searchLoading" class="text-center p-5">
              <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
              <div class="mt-3">กำลังค้นหาข้อมูล...</div>
            </div>
            
            <!-- แสดงเมื่อไม่พบข้อมูล -->
            <div v-else-if="jobs.length === 0" class="text-center p-5">
              <i class="pi pi-search" style="font-size: 2rem"></i>
              <div class="mt-3">ไม่พบข้อมูลงานที่ตรงตามเงื่อนไข</div>
            </div>
            
            <!-- แสดงข้อมูลงานเมื่อมีข้อมูล -->
            <div v-else>
              <div v-for="(job, index) in jobs" :key="job.job_id" class="mb-3">
                <Accordion :multiple="true">
                  <AccordionPanel>
                    <AccordionHeader>อันดีบที่ {{index + 1 }} {{ job.title }} - {{ job.company_name }}</AccordionHeader>
                      <AccordionContent>
                        <div class="p-3">
                          <h5 class="mb-3 border-bottom pb-2">ข้อมูลพื้นฐาน</h5>
                          <div class="row">
                            <div class="col-md-6">
                              <p><strong>ตำแหน่ง:</strong> {{ job.title }}</p>
                              <p><strong>บริษัท:</strong> {{ job.company_name }}</p>
                              <p><strong>สถานที่:</strong> 
                                <span v-if="job.area">{{ job.area }}, </span>
                                <span v-if="job.city">{{ job.city }}, </span>
                                <span v-if="job.country">{{ job.country }}</span>
                                <span v-if="!job.area && !job.city && !job.country">ไม่ระบุ</span>
                              </p>
                            </div>
                            <div class="col-md-6">
                              <p><strong>สัญญาจ้าง:</strong> {{ job.type || 'ไม่ระบุ' }}</p>
                              <p><strong>เงินเดือน:</strong> 
                                <span v-if="job.min_salary && job.max_salary">
                                  {{ formatSalary(job.min_salary) }} - {{ formatSalary(job.max_salary) }} {{ job.currency }}
                                </span>
                                <span v-else-if="job.min_salary">
                                  {{ formatSalary(job.min_salary) }}+ {{ job.currency }}
                                </span>
                                <span v-else-if="job.max_salary">
                                  ถึง {{ formatSalary(job.max_salary) }} {{ job.currency }}
                                </span>
                                <span v-else>ไม่ระบุ</span>
                              </p>
                            </div>
                          </div>

                          <h5 class="mt-4 mb-3 border-bottom pb-2">ทักษะที่ต้องการ</h5>
                          <div class="row">
                            <div class="col-md-6">
                              <h6 class="fw-bold text-primary">Soft Skills</h6>
                              <ul>
                                <li v-for="skill in job.soft_skills" :key="skill">{{ skill }}</li>
                              </ul>
                            </div>
                            <div class="col-md-6">
                              <h6 class="fw-bold text-success">Hard Skills</h6>
                              <ul>
                                <li v-for="skill in job.hard_skills" :key="skill">{{ skill }}</li>
                              </ul>
                            </div>
                          </div>

                          <h5 class="mt-4 mb-3 border-bottom pb-2">รายละเอียดงาน</h5>
                          <div class="job-content" v-html="formatJobContent(job.content)"></div>
                        </div>
                      </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- เเสดงเเจ้งเตือน -->
      <Dialog v-model:visible="notificationDialog.visible" :style="{ width: '350px' }" :header="notificationDialog.header" :modal="true">
        <div class="d-flex align-items-center">
          <i :class="notificationDialog.icon" class="me-2" style="font-size: 1.5rem" />
          <span>{{ notificationDialog.message }}</span>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <Button label="ตกลง" @click="closeNotification" autofocus />
        </div>
      </Dialog>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted ,reactive} from 'vue';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import Chip from 'primevue/chip';
import Dialog from 'primevue/dialog';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

export default {
  name: 'TheMapping',
  components: {
    Button,
    MultiSelect,
    Select,
    Chip,
    Dialog,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent
  },
  setup() {
    // ข้อมูลหมวดหมู่ย่อย (Sub-categories)
    const subCategories = ref([]);
    const selectedSubCategory = ref(null);
    const subCategoriesLoading = ref(false);
    
    // ข้อมูลทักษะ (Hard Skills)
    const hardSkills = ref([]);
    const hardSkillsLoading = ref(false);
    
    // ข้อมูลทักษะ (Soft Skills)
    const softSkills = ref([]);
    const softSkillsLoading = ref(false);
    const selectedHardSkills = ref([]);
    const selectedSoftSkills = ref([]);
    const searchLoading = ref(false);
    
    // ข้อมูลรายการงาน
    const jobs = ref([]);
    const searchJobsSubmitted = ref(false);
    
    // ตัวแปรสำหรับแสดงรายละเอียดงาน
    const jobDetailDialog = ref(false);
    const selectedJob = ref(null);

    // ตัวเเปรสำหรับเเสดงเเจ้งเตือน
    const notificationDialog = reactive({
      visible: false,
      header: '',
      message: '',
      icon: '',
      callback: null // ฟังก์ชันที่จะเรียกหลังจากปิด notification
    });

    // ฟังก์ชันดึงข้อมูลหมวดหมู่ย่อยจาก API
    const fetchSubCategories = async () => {
      subCategoriesLoading.value = true;
      try {       
        const response = await axios.get('http://127.0.0.1:8000/subcategory');
        if (response.data && response.data.status === "success" && response.data.data) {
          // แปลงข้อมูลให้ตรงกับรูปแบบที่ต้องการ
          subCategories.value = response.data.data.map(item => ({
            name: item.name,
            code: item.sub_category_id.toString()
          }));
        }
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูลหมวดหมู่ย่อยได้:', error);
      } finally {
        subCategoriesLoading.value = false;
      }
    };
    
    // ฟังก์ชันดึงข้อมูล Hard Skills จาก API
    const fetchHardSkills = async () => { 
      hardSkillsLoading.value = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/mapping/hard_skills');
        if (response.data && response.data.status === "success" && response.data.skills) {
          // แปลงข้อมูลให้ตรงกับรูปแบบที่ต้องการ
          hardSkills.value = response.data.skills.map((item, index) => ({
            name: item.skill_name,
            code: `hard_${index}`
          }));
        }
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูล Hard Skills ได้:', error);
      } finally {
        hardSkillsLoading.value = false;
      }
    };
    
    // ฟังก์ชันดึงข้อมูล Soft Skills จาก API
    const fetchSoftSkills = async () => {
      softSkillsLoading.value = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/mapping/soft_skills');
        if (response.data && response.data.status === "success" && response.data.skills) {
          // แปลงข้อมูลให้ตรงกับรูปแบบที่ต้องการ
          softSkills.value = response.data.skills.map((item, index) => ({
            name: item.skill_name,
            code: `soft_${index}`
          }));
        }
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูล Soft Skills ได้:', error);
      } finally {
        softSkillsLoading.value = false;
      }
    };
    
    // ฟังก์ชันค้นหางาน
    const searchJobs = async () => {
      searchJobsSubmitted.value = true;
      // ตรวจสอบเงื่อนไขก่อนการค้นหา: ต้องเลือกหมวดหมู่งานและมีทักษะอย่างน้อย 1 สกิล
      if (!selectedSubCategory.value || (selectedHardSkills.value.length === 0 && selectedSoftSkills.value.length === 0)) {
        showNotification('error', 'แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบ');
        return;
      }
      
      try {
        // แสดงสถานะกำลังโหลด
        searchLoading.value = true;
        
        // เตรียมพารามิเตอร์สำหรับส่งไปยัง API
        const params = {
          sub_category_id: selectedSubCategory.value.code,
          hard_skills: selectedHardSkills.value.map(skill => skill.name),
          soft_skills: selectedSoftSkills.value.map(skill => skill.name)
        };
        
        console.log('Search params:', params);
        
        // เรียก API เพื่อค้นหางานที่เหมาะสม
        const response = await axios.post('http://127.0.0.1:8000/mapping/retrieval', params);
        
        if (response.data && response.data.status === "success" && response.data.jobs) {
          jobs.value = response.data.jobs;
        } else {
          // กรณีไม่พบข้อมูลหรือมีข้อผิดพลาด
          jobs.value = [];
        }
        
        console.log('Search response:', response.data);
        
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการค้นหางาน:', error);
        jobs.value = [];
      } finally {
        searchLoading.value = false;
      }
    };
    
    // ลบ Hard Skill ที่เลือก
    const removeHardSkill = (skill) => {
      selectedHardSkills.value = selectedHardSkills.value.filter(s => s.code !== skill.code);
    };
    
    // ลบ Soft Skill ที่เลือก
    const removeSoftSkill = (skill) => {
      selectedSoftSkills.value = selectedSoftSkills.value.filter(s => s.code !== skill.code);
    };
    
    // ฟังก์ชันแสดงรายละเอียดงาน
    const viewJobDetails = (job) => {
      selectedJob.value = job;
      jobDetailDialog.value = true;
    };
    
    // ฟังก์ชันจัดรูปแบบเงินเดือน
    const formatSalary = (value) => {
      if (value === null || value === undefined) return '';
      return new Intl.NumberFormat('th-TH').format(value);
    };
    
    // ฟังก์ชันจัดรูปแบบเนื้อหางาน
    const formatJobContent = (content) => {
      if (!content) return '<p>ไม่มีข้อมูล</p>';
      
      // แปลง Markdown เป็น HTML อย่างง่าย
      let html = content;

      // แปลงตัวหนา
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
      
      // แปลง bullet points
      html = html.replace(/\n\s*\*\s+([^\n]+)/g, '<li>$1</li>');
      html = html.replace(/<li>([^<]+)<\/li>/g, '<ul><li>$1</li></ul>');
      html = html.replace(/<\/ul>\s*<ul>/g, '');
      
      // แปลงย่อหน้า
      html = html.replace(/\n\n/g, '</p><p>');
      html = html.replace(/\n/g, '<br>');
      
      // ครอบด้วย paragraph tag
      if (!html.startsWith('<')) {
        html = '<p>' + html + '</p>';
      }
      
      return html;
    };

    // แสดงเเเจ้งเตือน
    const showNotification = (type, header, message, callback = null) => {
      notificationDialog.visible = true;
      notificationDialog.header = header;
      notificationDialog.message = message;
      notificationDialog.callback = callback;
      
      // กำหนด icon ตาม type
      switch (type) {
        case 'success':
          notificationDialog.icon = 'pi pi-check-circle text-success';
          break;
        case 'error':
          notificationDialog.icon = 'pi pi-times-circle text-danger';
          break;
        case 'warning':
          notificationDialog.icon = 'pi pi-exclamation-triangle text-warning';
          break;
        case 'info':
          notificationDialog.icon = 'pi pi-info-circle text-info';
          break;
        default:
          notificationDialog.icon = 'pi pi-info-circle';
      }
    };

    // ปิดเเเจ้งเตือน
    const closeNotification = () => {
      notificationDialog.visible = false;
      if (typeof notificationDialog.callback === 'function') {
        notificationDialog.callback();
      }
    };
    
    // เรียกฟังก์ชันหลังจากคอมโพเนนต์โหลดเสร็จ
    onMounted(() => {
      fetchSubCategories();
      fetchHardSkills();
      fetchSoftSkills();
    });
    
    return {

      // ตัวเเปรพารามิเตอร์
      searchLoading,
      subCategories,
      selectedSubCategory,
      subCategoriesLoading,
      hardSkills,
      softSkills,
      selectedHardSkills,
      selectedSoftSkills,
      hardSkillsLoading,
      softSkillsLoading, 
      jobs,
      searchJobsSubmitted,
      jobDetailDialog,
      selectedJob,
      notificationDialog,
      
      // ฟังก์ชั่น
      searchJobs,
      removeHardSkill,
      removeSoftSkill,
      viewJobDetails,
      formatSalary,
      formatJobContent,
      showNotification,
      closeNotification

    };
  }
}
</script>

<style scoped>
.p-inputtext {
  width: 100%;
}

/* ปรับแต่ง Dropdown */
:deep(.p-dropdown) {
  width: 100%;
}

:deep(.p-dropdown-panel) {
  max-height: 250px;
  overflow-y: auto;
}

/* ปรับแต่งการแสดงผล MultiSelect */
:deep(.p-multiselect-token) {
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}

/* ปรับแต่งการแสดงผลรายละเอียดงาน */
.job-content {
  line-height: 1.6;
  white-space: pre-line;
}

.job-content ul {
  padding-left: 1.5rem;
}

.job-content p {
  margin-bottom: 1rem;
}
</style>