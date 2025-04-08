<!-- src\components\TheMapping.vue -->
<template>
  <div class="container py-4 min-vh-100">
    <h1 class="fw-bold text-center mb-4" style="color: #2A2D65;">Skill Mapping</h1>
    
    <div class="row justify-content-center">
      <!-- ส่วนด้านซ้าย (ตัวกรอง) -->
      <div class="col-md-5">
        <div class="card p-4 mb-4">
          <h4 class="mb-3">เลือกหมวดหมู่และทักษะ</h4>
          
          <!-- Dropdown สำหรับกรอง sub_category -->
          <div class="mb-4">
            <label class="form-label fw-bold">หมวดหมู่งานย่อย</label>
            <Dropdown v-model="selectedCategory" :options="subCategories" optionLabel="name" 
              placeholder="เลือกหมวดหมู่งานย่อย" class="w-100" />
          </div>
          
          <!-- MultiSelect สำหรับ Hard Skills -->
          <div class="mb-3">
            <label class="form-label fw-bold">Hard Skills</label>
              <MultiSelect v-model="selectedHardSkills" 
                display="chip" 
                :options="hardSkills" 
                optionLabel="name"
                filter 
                placeholder="เลือก Hard Skills" 
                :maxSelectedLabels="3" 
                class="w-100"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :loading="hardSkillsLoading" />
          </div>
          
          <!-- MultiSelect สำหรับ Soft Skills -->
          <div class="mb-3">
            <label class="form-label fw-bold">Soft Skills</label>
            <MultiSelect v-model="selectedSoftSkills" 
                display="chip" 
                :options="softSkills" 
                optionLabel="name"
                filter 
                placeholder="เลือก Soft Skills" 
                :maxSelectedLabels="3" 
                class="w-100"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :loading="softSkillsLoading" />
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
      
      <!-- ส่วนด้านขวา (รายการงาน) -->
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

    </div>
    
   
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { FilterMatchMode } from "@primevue/core/api";
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import Badge from 'primevue/badge';
import Chip from 'primevue/chip';
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
// import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import axios from 'axios';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

export default {
  name: 'TheMapping',
  components: {
    // DataTable,
    // Column,
    Button,
    MultiSelect,
    Dropdown,
    SelectButton,
    InputText,
    Badge,
    Chip,
    IconField,
    InputIcon,
    // Dialog,
    Tag,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent
  },
  setup() {
    // ข้อมูลหมวดหมู่ย่อย (Sub-categories)
    const subCategories = ref([]);
    const selectedCategory = ref(null);
    
    // ฟังก์ชันดึงข้อมูลหมวดหมู่ย่อยจาก API
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/subcategory');
        if (response.data && response.data.data) {
          // แปลงข้อมูลให้ตรงกับรูปแบบที่ต้องการ
          subCategories.value = response.data.data.map(item => ({
            name: item.name,
            code: item.sub_category_id.toString()
          }));
        }
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูลหมวดหมู่ย่อยได้:', error);
      }
    };
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
    
    // ตัวแปรสำหรับแสดงรายละเอียดงาน
    const jobDetailDialog = ref(false);
    const selectedJob = ref(null);
    
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
    
    // ตัวกรองข้อมูล
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    
    // ฟังก์ชันค้นหางาน
    const searchJobs = async () => {
      // ตรวจสอบเงื่อนไขก่อนการค้นหา: ต้องเลือกหมวดหมู่งานและมีทักษะอย่างน้อย 1 สกิล
      if (!selectedCategory.value) {
        alert('กรุณาเลือกหมวดหมู่งานย่อย');
        return;
      }
      
      if (selectedHardSkills.value.length === 0 && selectedSoftSkills.value.length === 0) {
        alert('กรุณาเลือกทักษะอย่างน้อย 1 ทักษะ (Hard Skills หรือ Soft Skills)');
        return;
      }
      
      try {
        // แสดงสถานะกำลังโหลด
        searchLoading.value = true;
        
        // เตรียมพารามิเตอร์สำหรับส่งไปยัง API
        const params = {
          sub_category_id: selectedCategory.value.code,
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
    
    // ฟังก์ชันเปิดลิงก์งาน
    const openJobLink = (job) => {
      if (job.share_link) {
        window.open(job.share_link, '_blank');
      }
    };
    
    // ฟังก์ชันจัดรูปแบบเงินเดือน
    const formatSalary = (value) => {
      if (value === null || value === undefined) return '';
      return new Intl.NumberFormat('th-TH').format(value);
    };
    
    // ฟังก์ชันรวมข้อมูลสถานที่
    const getLocationString = (job) => {
      const parts = [];
      if (job.area) parts.push(job.area);
      if (job.city) parts.push(job.city);
      if (job.country) parts.push(job.country);
      
      return parts.join(', ') || 'ไม่ระบุ';
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
    
    // ฟังก์ชันแสดง Hard Skills ที่ตรงกับที่เลือก
    const getMatchedHardSkills = (job) => {
      if (!job.hard_skills || !selectedHardSkills.value.length) return [];
      
      const selectedSkillNames = selectedHardSkills.value.map(skill => skill.name.toLowerCase());
      return job.hard_skills
        .filter(skill => selectedSkillNames.includes(skill.toLowerCase()))
        .slice(0, 3); // แสดงเฉพาะ 3 อันแรก
    };
    
    // ฟังก์ชันแสดง Soft Skills ที่ตรงกับที่เลือก
    const getMatchedSoftSkills = (job) => {
      if (!job.soft_skills || !selectedSoftSkills.value.length) return [];
      
      const selectedSkillNames = selectedSoftSkills.value.map(skill => skill.name.toLowerCase());
      return job.soft_skills
        .filter(skill => selectedSkillNames.includes(skill.toLowerCase()))
        .slice(0, 3); // แสดงเฉพาะ 3 อันแรก
    };
    
    // ส่งออกไฟล์ CSV
    const exportCSV = () => {
      // สร้างข้อมูล CSV
      let csv = 'ตำแหน่งงาน,บริษัท,สถานที่,เงินเดือน,ประเภท,คะแนน,ลิงก์\n';
      
      jobs.value.forEach(job => {
        const salary = (job.min_salary && job.max_salary) 
                      ? `${formatSalary(job.min_salary)}-${formatSalary(job.max_salary)} ${job.currency || ''}`
                      : 'ไม่ระบุ';
        
        const location = getLocationString(job);
        
        csv += `"${job.title}","${job.company_name}","${location}","${salary}","${job.type || 'ไม่ระบุ'}","${job.bm25_score || '0'}","${job.share_link || ''}"\n`;
      });
      
      // สร้าง Blob และดาวน์โหลด
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'job_results.csv');
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    onMounted(() => {
      fetchSubCategories();
      fetchHardSkills();
      fetchSoftSkills();
    });
    
    return {
      searchLoading,
      subCategories,
      selectedCategory,
      hardSkills,
      softSkills,
      selectedHardSkills,
      selectedSoftSkills,
      hardSkillsLoading,
      softSkillsLoading, 
      jobs,
      filters,
      jobDetailDialog,
      selectedJob,
      searchJobs,
      removeHardSkill,
      removeSoftSkill,
      viewJobDetails,
      openJobLink,
      formatSalary,
      getLocationString,
      formatJobContent,
      getMatchedHardSkills,
      getMatchedSoftSkills,
      exportCSV
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