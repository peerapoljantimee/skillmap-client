<!-- src/components/admin/TheScraping.vue -->
<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <!-- Sidebar -->
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <TheSidebar />
      </div>
      <!-- Main Content -->
      <div class="col py-3">
        <h1 class="fw-bold h1 mb-0" style="color: #2a2d65">
          นำเข้าประกาศรับสมัครงาน
        </h1>

        <div class="card p-4 mb-4">
          <h4 class="mb-3">เลือกหมวดหมู่ที่ต้องการ</h4>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">หมวดหมู่หลัก<span class="text-danger">*</span></label>
                <Select v-model="selectedMainCategory" name="selectedMaincategory" :options="maincategories" optionLabel="name" 
                placeholder="เลือกหมวดหมู่หลัก" class="w-100" required/>
            </div>
            <div class="col-md-6">
              <label class="form-label">หมวดหมู่ย่อย<span class="text-danger">*</span></label>
                <Select v-model="selectedSubcategory" name="selectedSubcategory" :options="subcategories" optionLabel="name" filter
                placeholder="เลือกหมวดหมู่ย่อย" class="w-100" required/>
            </div>
          </div>
            <Button
              type="button"
              label="ดึงข้อมูล"
              icon="pi pi-database"
              @click="fetchData()"
              class="w-25 p-button-secondary"
            />
        </div>
  

        <div class="card p-4 mb-4">
          <DataTable
            v-model:selection="selectedJobs"
            v-model:filters="filters"
            :value="sreach_jobs_posting"
            dataKey="jobDetails.job.id"
            paginator
            filterDisplay="menu"
            :loading="isLoading"
            :rows="32"
            :totalRecords="sreach_jobs_posting.length"
            :rowsPerPageOptions="[32, 40, 50, 60]"
            tableStyle="min-width: 50rem"
            responsiveLayout="scroll"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            :globalFilterFields="[
              'jobDetails.job.title',
              'jobDetails.job.advertiser.name',
              'jobDetails.gfjInfo.workTypes.label',
              'jobDetails.gfjInfo.location.state',
              'jobDetails.job.locationInfo.area',
              'jobDetails.gfjInfo.location.country',
            ]"
          >
            <template #header>
              <div
                class="d-flex justify-content-between align-items-center w-100"
              >
                <!-- <Button
                  type="button"
                  icon="pi pi-filter-slash"
                  label="Clear"
                  severity="secondary"
                  outlined
                  @click="clearFilter()"
                /> -->
                <IconField>
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText
                    v-model="filters['global'].value"
                    placeholder="Keyword Search"
                  />
                </IconField>
              </div>
            </template>
              <template #empty>
                <div class="text-center py-5">
                  <div class="mb-3"><i class="pi pi-inbox" style="font-size: 2rem"></i></div>
                  <div>ไม่พบข้อมูลประกาศรับสมัครงาน</div>
                </div>
              </template>
              <template >
                <div class="text-center py-5">
                  <div class="mb-3"><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></div>
                  <div>กำลังโหลดข้อมูล...</div>
                </div>
              </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column header="ตำแหน่งงาน" sortable field="jobDetails.job.title">
              <template #body="{ data }">
                {{ data.jobDetails.job.title }}
              </template>
              <!-- <template #filter="{ filterModel, filterCallback }"> -->
              <template>
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  @input="filterCallback()"
                  placeholder="Search by Title"
                />
              </template>
            </Column>
            <Column
              header="บริษัท"
              sortable
              field="jobDetails.job.advertiser.name"
            >
              <template #body="{ data }">
                {{ data.jobDetails.job.advertiser.name }}
              </template>
              <!-- <template #filter="{ filterModel, filterCallback }"> -->
              <template>
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  @input="filterCallback()"
                  placeholder="Search by Company"
                />
              </template>
            </Column>
            <Column header="เงินเดือน" field="salary">
              <template #body="{ data }">
                {{ data.jobDetails?.job?.salary?.label || "Not Disclosed" }}
              </template>
            </Column>
            <Column
              header="ประเภทงาน"
              sortable
              field="jobDetails.gfjInfo.workTypes.label"
              :showFilterMatchModes="false"
            >
              <template #body="{ data }">
                {{ data.jobDetails.gfjInfo.workTypes.label[0] }}
              </template>
              <!-- <template #filter="{ filterModel }">
                <MultiSelect
                  v-model="filterModel.value"
                  :options="workTypes"
                  optionLabel="name"
                  placeholder="Any"
                  style="min-width: 14rem"
                >
                  <template #option="slotProps">
                    <div class="flex items-center gap-2">
                      <span>{{ slotProps.option.type }}</span>
                    </div>
                  </template>
                </MultiSelect>
              </template> -->
            </Column>
            <Column header="URL">
              <template #body="{ data }">
                <a :href="data.jobDetails.job.shareLink"
                  ><i class="pi pi-link" style="font-size: 1.5rem"></i
                ></a>
              </template>
            </Column>
            <Column header="เมือง" field="jobDetails.gfjInfo.location.state">
              <template #body="{ data }">
                {{ data.jobDetails.gfjInfo.location.state }}
              </template>
              <!-- <template #filter="{ filterModel, filterCallback }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  @input="filterCallback()"
                  placeholder="Search by City"
                />
              </template> -->
            </Column>
            <Column header="เขต/อำเภอ" field="jobDetails.job.locationInfo.area">
              <template #body="{ data }">
                {{ data.jobDetails?.job?.locationInfo?.area || "N/A" }}
              </template>
              <!-- <template #filter="{ filterModel, filterCallback }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  @input="filterCallback()"
                  placeholder="Search by Area"
                />
              </template> -->
            </Column>
            <Column
              header="ประเทศ"
              field="jobDetails.gfjInfo.location.country"
            >
              <template #body="{ data }">
                {{ data.jobDetails.gfjInfo.location.country }}
              </template>
              <!-- <template #filter="{ filterModel, filterCallback }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  @input="filterCallback()"
                  placeholder="Search by Country"
                />
              </template> -->
            </Column>
          </DataTable>
        </div>
     
        <div class="d-flex justify-content mt-3">
          <Button
            type="button"
            label="INSERT JOBPOSTINGS"
            icon="pi pi-database"
            @click="insert_jobpostings()"
            class="p-button-success "
          />
        </div>
      </div>
      <!-- Notification Dialog -->
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
import TheSidebar from "@/components/admin/TheSidebar.vue";
import axios from "axios";
import { ref, onMounted, reactive } from "vue";

// นำเข้า PrimeVue Components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "@primevue/core/api";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Card from "primevue/card";
import Button from "primevue/button";
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';

export default {
  name: "TheScraping",
  components: {
    TheSidebar,
    DataTable,
    Column,
    InputText,
    MultiSelect,
    IconField,
    InputIcon,
    Card,
    Button,
    Select,
    Dialog
  },
  setup() {
    // ฟอร์มเลือกหมวดหมู่
    const maincategories = ref([]);
    const selectedMainCategory = ref(null);
    const subcategories = ref([]);
    const selectedSubcategory = ref(null);

    // ข้อมูลที่ได้จาก scraping (DataTable)
    const sreach_jobs_posting = ref([]);

    // รอโหลดข้อมูล
    const isLoading = ref(false);
    const loading = ref(true);
    // สำหรับเก็บรายการงานที่เลือก (PrimeVue DataTable v-model:selection)
    const selectedJobs = ref([]);

    // กรองข้อมูล
    const filters = ref();
    const initFilters = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        "jobDetails.job.title": {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        "jobDetails.job.advertiser.name": {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        "jobDetails.gfjInfo.workTypes.label": {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        "jobDetails.gfjInfo.location.state": {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        "jobDetails.job.locationInfo.area": {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        "jobDetails.gfjInfo.location.country": {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
      };
    };
    initFilters();
    const clearFilter = () => {
      initFilters();
    };
    const workTypes = ref([]);

    // ตัวแปรสำหรับ Notification Dialog
    const notificationDialog = reactive({
      visible: false,
      header: '',
      message: '',
      icon: '',
      callback: null // ฟังก์ชันที่จะเรียกหลังจากปิด notification
    });

    // แสดง Notification แทน Toast
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

    // ปิด Notification Dialog
    const closeNotification = () => {
      notificationDialog.visible = false;
      if (typeof notificationDialog.callback === 'function') {
        notificationDialog.callback();
      }
    };

    //เพื่มประกาศรับสมัครงาน
    // เพิ่มประกาศรับสมัครงานไปยัง API
    const insert_jobpostings = async () => {
      if (selectedJobs.value.length === 0) {
        showNotification('error', 'ข้อผิดพลาด', 'กรุณาเลือกงานที่ต้องการเพิ่มก่อน!');
        return;
      }
      console.log("Type of selectedJobs:", typeof selectedJobs.value);
      console.log("Value of selectedJobs:", selectedJobs.value);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/scraping/jobpostings",
          {
            jobs: selectedJobs.value, // ส่ง job ที่ถูกเลือก
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8", // ✅ กำหนดให้ใช้ UTF-8
            },
          }
        );
        // console.log(selectedJobs.value)
        console.log("Response:", response.jobs);
        console.log("🚀 ข้อมูลที่ส่งไป:", JSON.stringify({jobs: selectedJobs.value}, null, 2));
        showNotification('success', 'สำเร็จ', 'เพิ่มข้อมูลสำเร็จ!');
        selectedJobs.value = [];
        sreach_jobs_posting.value = [];


      } catch (error) {
        console.error("Error inserting job postings:", error);
        showNotification('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล!');
      }
    };

    // โหลดข้อมูลหมวดหมู่หลักเมื่อคอมโพเนนต์ถูก mounted
    const fetchMainCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/maincategory");
        maincategories.value = response.data.data;
      } catch (error) {
        console.error("Error fetching main categories:", error);
        showNotification('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการโหลดหมวดหมู่หลัก');
      }
    };

    // เมื่อเลือกหมวดหมู่หลัก ให้โหลดหมวดหมู่ย่อย
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/subcategory`);
        subcategories.value = response.data.data;
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        showNotification('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการโหลดหมวดหมู่ย่อย');
      }
    };

    // เมื่อกด submit เพื่อดึงข้อมูลงานจาก API
    const fetchData = async () => {
      if (!selectedMainCategory.value || !selectedSubcategory.value) {
        showNotification('warning', 'เเจ้งเตือน', 'กรุณาเลือกหมวดหมู่หลักและหมวดหมู่ย่อยก่อน');
        return;
      }
      isLoading.value = true;

      // ล้างค่าข้อมูลเก่าก่อนเรียก API
      selectedJobs.value = [];
      sreach_jobs_posting.value = [];
      workTypes.value = [];

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/scraping/sreach_jobsposting",
          {
            classification_id: selectedMainCategory.value.main_category_id,
            subcategory_id: selectedSubcategory.value.sub_category_id,
          }
        );

        console.log("response data length", response.data.data.length)

        if (response.data.data.length === 0) {
          showNotification('warning', 'ไม่มีข้อมูล', 'ไม่พบข้อมูลประกาศรับสมัครงานในหมวดหมู่ที่เลือก');
          return;
        }

        // อัปเดตข้อมูล
        sreach_jobs_posting.value = response.data.data;

        const workTypeSet = new Set();
        sreach_jobs_posting.value.forEach((job) => {
          if (job.jobDetails?.gfjInfo?.workTypes?.label) {
            job.jobDetails.gfjInfo.workTypes.label.forEach((label) => {
              workTypeSet.add(label);
            });
          }
        });

        // ✅ แปลงเป็น array ในรูปแบบที่ต้องการ
        workTypes.value = Array.from(workTypeSet).map((type) => ({ type }));

        console.log("sreach_jobs_posting", response.data.data);
      } catch (error) {
        console.error("Error sreach jobs posting:", error);
        showNotification('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการดึงข้อมูล');
        // alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchMainCategories();
      fetchSubcategories();
    });

    return {
      maincategories,
      selectedMainCategory,
      subcategories,
      selectedSubcategory,
      sreach_jobs_posting,
      selectedJobs,
      isLoading,
      loading,
      filters,
      workTypes,

      fetchMainCategories,
      fetchSubcategories,
      fetchData,
      clearFilter,
      insert_jobpostings,


      // ตัวแปรสำหรับ Notification Dialog
      notificationDialog,
      showNotification,
      closeNotification,
    };
  },
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>
