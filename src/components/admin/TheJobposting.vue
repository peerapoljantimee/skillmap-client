<!-- src\components\admin\TheJobposting.vue -->
<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <TheSidebar />
      </div>
      <!-- ส่วนของเนื้อหา -->
      <div class="col py-3">
        <h1 class="fw-bold h1 mb-4" style="color: #2A2D65;">เเสดงประกาศรับสมัครงาน</h1>
        
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-3">
              <!-- ส่วนค้นหา -->
              <div class="d-flex align-items-center">
                <span class="p-input-icon-left me-3">
                  <!-- <InputText v-model="filters.global.value" placeholder="ค้นหา" class="p-inputtext-sm" /> -->
                  <IconField>
                     <InputIcon class="pi pi-search" />
                     <InputText v-model="filters.global.value" placeholder="ค้นหา" class="p-inputtext-sm" />
                  </IconField>
                </span>
                <!-- <Dropdown v-model="statusFilter" :options="statusOptions" optionLabel="name" placeholder="สถานะ" class="me-2" />
                <Dropdown v-model="typeFilter" :options="typeOptions" optionLabel="name" placeholder="ประเภทงาน" /> -->
              </div>
              <!-- ปุ่มส่งออก/เพิ่มงาน -->
              <!-- <div>
                <Button icon="pi pi-plus" label="เพิ่มประกาศ" class="p-button-success me-2" />
                <Button icon="pi pi-file-excel" label="ส่งออก Excel" class="p-button-outlined" />
              </div> -->
            </div>
            
            <!-- DataTable แสดงรายการประกาศงาน -->
            <DataTable 
              :value="jobs" 
              v-model:filters="filters"
              filterDisplay="menu" 
              :loading="loading"
              :paginator="true" 
              :rows="10"
              :rowsPerPageOptions="[5, 10, 25, 50, 100]"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="แสดง {first} ถึง {last} จากทั้งหมด {totalRecords} รายการ"
              responsiveLayout="scroll"
              dataKey="job_id"
              stripedRows
              sortMode="multiple"
              :globalFilterFields="['title', 'company_name', 'city', 'type']"
            >
              <!-- คอลัมน์ ID -->
              <Column field="job_id" header="รหัส" sortable style="min-width: 5rem"></Column>
              
              <!-- คอลัมน์ตำแหน่งงาน -->
              <Column field="title" header="ตำแหน่งงาน" sortable style="min-width: 14rem">
                <template #body="slotProps">
                  <div class="d-flex flex-column">
                    <span class="fw-bold text-primary">{{ slotProps.data.title }}</span>
                    <span class="small">{{ slotProps.data.company_name }}</span>
                  </div>
                </template>
                <!-- <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="ค้นหาตำแหน่ง" class="p-column-filter" />
                </template> -->
              </Column>
              
              <!-- คอลัมน์หมวดหมู่ -->
              <Column field="sub_category_name" header="หมวดหมู่" sortable style="min-width: 12rem">
                <template #body="slotProps">
                  <div class="d-flex flex-column">
                    <span>{{ slotProps.data.sub_category_name }}</span>
                    <span class="small text-muted">{{ slotProps.data.main_category_name }}</span>
                  </div>
                </template>
              </Column>
              
              <!-- คอลัมน์สถานที่ -->
              <Column field="city" header="สถานที่" sortable style="min-width: 10rem">
                <template #body="slotProps">
                  <div>
                    <div v-if="slotProps.data.city">{{ slotProps.data.city }}</div>
                    <div v-if="slotProps.data.area" class="small">{{ slotProps.data.area }}</div>
                    <div class="small">{{ slotProps.data.country }}</div>
                  </div>
                </template>
              </Column>
              
              <!-- คอลัมน์ประเภทงาน -->
              <Column field="type" header="ประเภท" sortable style="min-width: 8rem">
                <template #body="slotProps">
                  <Tag :value="slotProps.data.type" :severity="getTypeSeverity(slotProps.data.type)" />
                </template>
              </Column>
              
              <!-- คอลัมน์สถานะ -->
              <Column field="status" header="สถานะ" sortable style="min-width: 8rem">
                <template #body="slotProps">
                  <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" />
                </template>
              </Column>
              
              <!-- คอลัมน์เงินเดือน -->
              <Column header="เงินเดือน" sortable style="min-width: 10rem">
                <template #body="slotProps">
                  <div v-if="slotProps.data.min_salary || slotProps.data.max_salary">
                    <span v-if="slotProps.data.min_salary && slotProps.data.max_salary">
                      {{ formatSalary(slotProps.data.min_salary) }} - {{ formatSalary(slotProps.data.max_salary) }}
                    </span>
                    <span v-else-if="slotProps.data.min_salary">
                      {{ formatSalary(slotProps.data.min_salary) }}+
                    </span>
                    <span v-else-if="slotProps.data.max_salary">
                      ถึง {{ formatSalary(slotProps.data.max_salary) }}
                    </span>
                    <span v-if="slotProps.data.currency"> {{ slotProps.data.currency }}</span>
                    <span v-if="slotProps.data.period" class="small text-muted">
                      /{{ slotProps.data.period }}
                    </span>
                  </div>
                  <div v-else class="text-muted">ไม่ระบุ</div>
                </template>
              </Column>
              
              <!-- คอลัมน์แหล่งที่มา -->
              <Column field="source_type" header="แหล่งที่มา" sortable style="min-width: 10rem">
                <template #body="slotProps">
                  <div>
                    <i class="pi" :class="{
                      'pi-cloud-download': slotProps.data.source_type === 'scraping',
                      'pi-user-edit': slotProps.data.source_type === 'manual'
                    }"></i>
                    <span class="ms-2">{{ getSourceTypeLabel(slotProps.data.source_type) }}</span>
                    <div v-if="slotProps.data.scraped_from" class="small">
                      จาก: {{ slotProps.data.scraped_from }}
                    </div>
                  </div>
                </template>
              </Column>
              
              <!-- คอลัมน์การดำเนินการ -->
              <Column header="การดำเนินการ" style="min-width: 8rem">
                <template #body="slotProps">
                  <div class="d-flex gap-2">
                    <Button icon="pi pi-eye" class="p-button-rounded p-button-text" 
                      tooltip="ดูรายละเอียด" tooltipOptions="{ position: 'top' }" 
                      @click="openJobDetail(slotProps.data)" />
                    <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-success" 
                      tooltip="แก้ไข" tooltipOptions="{ position: 'top' }" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" 
                      tooltip="ลบ" tooltipOptions="{ position: 'top' }" /> -->
                  </div>
                </template>
              </Column>
              
              <!-- สถานะการโหลด/ไม่มีข้อมูล -->
              <template #empty>
                <div class="text-center py-5">
                  <div class="mb-3"><i class="pi pi-inbox" style="font-size: 2rem"></i></div>
                  <div>ไม่พบข้อมูลประกาศรับสมัครงาน</div>
                </div>
              </template>
              <template #loading>
                <div class="text-center py-5">
                  <div class="mb-3"><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></div>
                  <div>กำลังโหลดข้อมูล...</div>
                </div>
              </template>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Dialog แสดงรายละเอียดงาน -->
  <Dialog v-model:visible="jobDetailVisible" :header="selectedJob?.title" :style="{width: '80vw'}" modal>
    <div v-if="selectedJob" class="job-detail-container">
      <div class="job-header mb-4">
        <div class="d-flex justify-content-between">
          <div>
            <h3 class="mb-1">{{ selectedJob.title }}</h3>
            <h5 class="text-secondary mb-2">{{ selectedJob.company_name }}</h5>
            <div class="mb-2">
              <Tag :value="selectedJob.type" :severity="getTypeSeverity(selectedJob.type)" class="me-2" />
              <Tag :value="selectedJob.status" :severity="getStatusSeverity(selectedJob.status)" />
            </div>
            <div class="text-secondary mb-1">
              <i class="pi pi-map-marker me-2"></i>
              <span v-if="selectedJob.area">{{ selectedJob.area }}, </span>
              <span v-if="selectedJob.city">{{ selectedJob.city }}, </span>
              <span v-if="selectedJob.country">{{ selectedJob.country }}</span>
            </div>
            <div v-if="selectedJob.min_salary || selectedJob.max_salary" class="text-secondary">
              <i class="pi pi-money-bill me-2"></i>
              <span v-if="selectedJob.min_salary && selectedJob.max_salary">
                {{ formatSalary(selectedJob.min_salary) }} - {{ formatSalary(selectedJob.max_salary) }}
              </span>
              <span v-else-if="selectedJob.min_salary">
                {{ formatSalary(selectedJob.min_salary) }}+
              </span>
              <span v-else-if="selectedJob.max_salary">
                ถึง {{ formatSalary(selectedJob.max_salary) }}
              </span>
              <span v-if="selectedJob.currency"> {{ selectedJob.currency }}</span>
              <span v-if="selectedJob.period">
                /{{ selectedJob.period }}
              </span>
            </div>
          </div>
          <div>
            <div class="text-end mb-2">
              <div><strong>แหล่งที่มา:</strong> {{ getSourceTypeLabel(selectedJob.source_type) }}</div>
              <div v-if="selectedJob.scraped_from" class="small">
                จาก: {{ selectedJob.scraped_from }}
              </div>
            </div>
            <div class="text-end">
              <div><strong>รหัสประกาศ:</strong> {{ selectedJob.job_id }}</div>
              <div><strong>หมวดหมู่:</strong> {{ selectedJob.main_category_name }} - {{ selectedJob.sub_category_name }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mb-4">
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="card">
            <div class="card-header bg-light">
              <h5 class="mb-0">Hard Skills</h5>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap gap-2">
                <Chip v-for="skill in parseSkills(selectedJob.hard_skills)" :key="skill" :label="skill" />
              </div>
              <div v-if="parseSkills(selectedJob.hard_skills).length === 0" class="text-muted text-center py-2">
                ไม่มีข้อมูล Hard Skills
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-light">
              <h5 class="mb-0">Soft Skills</h5>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap gap-2">
                <Chip v-for="skill in parseSkills(selectedJob.soft_skills)" :key="skill" :label="skill" />
              </div>
              <div v-if="parseSkills(selectedJob.soft_skills).length === 0" class="text-muted text-center py-2">
                ไม่มีข้อมูล Soft Skills
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header bg-light">
          <h5 class="mb-0">รายละเอียดงาน</h5>
        </div>
        <div class="card-body">
          <div class="job-content" v-html="formatJobContent(selectedJob.content)"></div>
        </div>
      </div>
      
      <div class="d-flex justify-content-end gap-2 mt-4">
        <!-- <Button icon="pi pi-pencil" label="แก้ไข" class="p-button-primary" />
        <Button v-if="selectedJob.status === 'Active'" icon="pi pi-ban" label="ระงับประกาศ" class="p-button-warning" />
        <Button v-else icon="pi pi-check" label="เปิดใช้งาน" class="p-button-success" />
        <Button icon="pi pi-trash" label="ลบ" class="p-button-danger" /> -->
      </div>
    </div>
  </Dialog>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import TheSidebar from "@/components/admin/TheSidebar.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import Chip from 'primevue/chip';
import Dropdown from 'primevue/dropdown';
import axios from 'axios';
import { FilterMatchMode } from "@primevue/core/api";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

export default {
  name: 'TheJobposting',
  components: { 
    TheSidebar,
    DataTable,
    Column,
    Button,
    InputText,
    Dialog,
    Tag,
    Chip,
    Dropdown,
    IconField,
    InputIcon
  },
  setup() {
    const jobs = ref([]);
    const loading = ref(false);
    const jobDetailVisible = ref(false);
    const selectedJob = ref(null);
    
    // ตัวกรอง
    const filters = reactive({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    
    const statusFilter = ref(null);
    const typeFilter = ref(null);
    
    // ตัวเลือกสำหรับ dropdown
    const statusOptions = ref([
      { name: 'ทั้งหมด', value: null },
      { name: 'เปิดรับสมัคร', value: 'Active' },
      { name: 'ปิดรับสมัคร', value: 'Inactive' },
      { name: 'รอการอนุมัติ', value: 'Pending' }
    ]);
    
    const typeOptions = ref([
      { name: 'ทั้งหมด', value: null },
      { name: 'งานประจำ', value: 'Full time' },
      { name: 'งานพาร์ทไทม์', value: 'Part time' },
      { name: 'งานชั่วคราว', value: 'Contract' },
      { name: 'ฝึกงาน', value: 'Internship' }
    ]);
    
    // ฟังก์ชันดึงข้อมูลประกาศงาน
    const fetchJobs = async () => {
      loading.value = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/jobs/jobsposting');
        if (response.data && response.data.data) {
          jobs.value = response.data.data;
          console.log('Jobs loaded:', jobs.value);
        }
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // ฟังก์ชันจัดรูปแบบเงินเดือน
    const formatSalary = (value) => {
      if (!value) return '';
      return new Intl.NumberFormat('th-TH').format(value);
    };
    
    // ฟังก์ชันกำหนดสีของ Tag สถานะ
    const getStatusSeverity = (status) => {
      switch (status) {
        case 'Active': return 'success';
        case 'Inactive': return 'danger';
        case 'Pending': return 'warning';
        default: return 'info';
      }
    };
    
    // ฟังก์ชันกำหนดสีของ Tag ประเภทงาน
    const getTypeSeverity = (type) => {
      switch (type) {
        case 'Full time': return 'primary';
        case 'Part time': return 'success';
        case 'Contract': return 'warning';
        case 'Internship': return 'info';
        default: return 'secondary';
      }
    };
    
    // ฟังก์ชันแปลงแหล่งที่มา
    const getSourceTypeLabel = (sourceType) => {
      switch (sourceType) {
        case 'scraping': return 'ดึงข้อมูลอัตโนมัติ';
        case 'manual': return 'เพิ่มด้วยตนเอง';
        default: return sourceType;
      }
    };
    
    // ฟังก์ชันแปลง string ของ skills เป็น array
    const parseSkills = (skillsString) => {
      if (!skillsString) return [];
      try {
        return JSON.parse(skillsString);
      } catch (e) {
        console.error('Error parsing skills:', e);
        return [];
      }
    };
    
    // ฟังก์ชันเปิด Dialog แสดงรายละเอียดงาน
    const openJobDetail = (job) => {
      selectedJob.value = job;
      jobDetailVisible.value = true;
    };
    
    // ฟังก์ชันจัดรูปแบบเนื้อหางาน
    const formatJobContent = (content) => {
      if (!content) return '<p>ไม่มีข้อมูล</p>';
      
      // แปลง Markdown เป็น HTML อย่างง่าย
      let html = content;
      
      // แปลงตัวหนา
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      
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
    
    onMounted(() => {
      fetchJobs();
    });
    
    return {
      jobs,
      loading,
      filters,
      statusOptions,
      typeOptions,
      statusFilter,
      typeFilter,
      formatSalary,
      getStatusSeverity,
      getTypeSeverity,
      getSourceTypeLabel,
      jobDetailVisible,
      selectedJob,
      openJobDetail,
      parseSkills,
      formatJobContent
    };
  }
};
</script>

<style scoped>
/* สไตล์สำหรับเนื้อหาประกาศงาน */
.job-content {
  line-height: 1.6;
}

.job-content ul {
  padding-left: 1.5rem;
}

.job-content p {
  margin-bottom: 1rem;
}

/* กำหนดความสูงสูงสุดของ Dialog */
::v-deep(.p-dialog-content) {
  max-height: 80vh;
  overflow-y: auto;
}
</style>