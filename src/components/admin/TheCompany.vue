<!-- src/components/admin/TheCompany.vue -->
<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <!-- Sidebar -->
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <TheSidebar />
      </div>
      <!-- Main Content -->
      <div class="col py-3">
        <h1 class="fw-bold h1 mb-4" style="color: #2a2d65">จัดการข้อมูลบริษัท</h1>

        <!-- Button to open Add Company Dialog -->
        <div class="mb-4">
          <Button label="เพิ่มบริษัทใหม่" icon="pi pi-plus" @click="openNewCompany" class="p-button-success" />
        </div>

        <!-- Company DataTable -->
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <div class="d-flex justify-content-between mb-3">
              <!-- ส่วนค้นหา -->
              <div class="d-flex align-items-center">
                <span class="p-input-icon-left me-3">
                  <IconField>
                     <InputIcon class="pi pi-search" />
                     <InputText v-model="filters.global.value" placeholder="ค้นหา" class="p-inputtext-sm" />
                  </IconField>
                </span>
                <!-- <Dropdown v-model="industryFilter" :options="industries" optionLabel="industry" placeholder="อุตสาหกรรม" class="me-2" /> -->
              </div>
              <!-- ปุ่มส่งออก Excel (ถ้าต้องการ) -->
              <!-- <div>
                <Button icon="pi pi-file-excel" label="ส่งออก Excel" class="p-button-outlined" />
              </div> -->
            </div>
            
            <!-- DataTable -->
            <DataTable 
              :value="companies" 
              :paginator="true" 
              :rows="10"
              :rowsPerPageOptions="[5, 10, 25, 50, 100]"
              dataKey="company_id"
              :filters="filters"
              filterDisplay="menu"
              loading-icon="pi pi-spin pi-spinner"
              :loading="loading"
              responsiveLayout="scroll"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="แสดง {first} ถึง {last} จากทั้งหมด {totalRecords} รายการ"              
              stripedRows
              sortMode="multiple"
              :globalFilterFields="['company_id', 'name', 'industry', 'company_size']"
              >
              <Column field="company_id" header="รหัส" sortable style="min-width: 5rem"></Column>
              <Column field="name" header="บริษัท" sortable style="min-width: 14rem">
                <template #body="slotProps">
                  <div class="d-flex flex-column">
                    <span class="fw-bold text-primary">{{ slotProps.data.name }}</span>
                    <span class="small" v-if="slotProps.data.short_name">{{ slotProps.data.short_name }}</span>
                  </div>
                </template>
                <!-- <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="ค้นหาบริษัท" class="p-column-filter" />
                </template> -->
              </Column>
              <Column field="industry" header="อุตสาหกรรม" sortable style="min-width: 12rem">
               <template #body="slotProps">
                  <span>{{ slotProps.data.industry || 'N/A' }}</span>
               </template>
                <!-- <template #filter="{ filterModel, filterCallback }">
                  <Dropdown 
                    v-model="filterModel.value"
                    :options="industries"
                    optionLabel="industry"
                    optionValue="industry"
                    placeholder="ทั้งหมด"
                    @change="filterCallback()"
                    class="p-column-filter"
                    showClear
                  />
                </template> -->
              </Column>
              <Column field="company_size" header="ขนาดบริษัท" sortable style="min-width: 12rem">
               <template #body="slotProps">
                  <span>{{ slotProps.data.company_size || 'N/A' }}</span>
               </template>
               <!-- <template #filter="{ filterModel, filterCallback }">
                  <Dropdown 
                     v-model="filterModel.value"
                     :options="companySizes"
                     optionLabel="company_size"
                     optionValue="company_size"
                     placeholder="ทั้งหมด"
                     @change="filterCallback()"
                     class="p-column-filter"
                     showClear
                  />
               </template> -->
              </Column>
              <Column field="count_jobs" header="จำนวนงาน" sortable style="min-width: 12rem"></Column>
              <Column field="verified" header="สถานะ" sortable style="min-width: 8rem">
                <template #body="slotProps">
                  <Tag :value="slotProps.data.verified === 1 ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยัน'" 
                       :severity="slotProps.data.verified === 1 ? 'success' : 'danger'" />
                </template>
              </Column>
              
              <!-- สถานะการโหลด/ไม่มีข้อมูล -->
              <template #empty>
                <div class="text-center py-5">
                  <div class="mb-3"><i class="pi pi-inbox" style="font-size: 2rem"></i></div>
                  <div>ไม่พบข้อมูลบริษัท</div>
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

        <!-- Add/Edit Company Dialog -->
        <Dialog v-model:visible="companyDialog" :style="{width: '600px'}" header="รายละเอียดบริษัท" :modal="true" class="p-fluid">
          <!-- <Toast /> -->
          
          <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit">
            <div class="row mb-3">
              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <div class="d-flex align-items-center justify-content-between">
                      <label for="name">ชื่อบริษัท <span class="text-danger">*</span></label>
                    </div>
                  </div>
                  <div class="col-sm-9">
                    <InputText name="name" id="name" class="w-100" :class="{'p-invalid': $form.name?.invalid && $form.name?.dirty}" />
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label for="short_name">ชื่อย่อ</label>
                  </div>
                  <div class="col-sm-9">
                    <InputText name="short_name" id="short_name" class="w-100" />
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label for="industry">อุตสาหกรรม</label>
                  </div>
                  <div class="col-sm-9"> 
                    <Select  
                      name="industry"
                      id="industry"
                      :options="industries"
                      placeholder="เลือกอุตสาหกรรม"
                      filter
                      optionLabel="industry"
                      class="w-100"
                    >
                      <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                          <div>{{ slotProps.value.industry !== null ? slotProps.value.industry : 'N/A' }}</div>
                        </div>
                        <span v-else>
                          {{ slotProps.placeholder }}
                        </span>
                      </template>

                      <template #option="slotProps">
                        <div class="flex items-center">
                          <div>{{ slotProps.option.industry !== null ? slotProps.option.industry : 'N/A' }}</div>
                        </div>
                      </template>
                    </Select>
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label for="company_size">ขนาดบริษัท</label>
                  </div>
                  <div class="col-sm-9">   
                    <Select 
                      name="company_size"
                      id="company_size"
                      :options="companySizes"
                      placeholder="เลือกขนาดบริษัท"          
                      optionLabel="company_size"
                      class="w-100"
                    >
                      <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                          <div>{{ slotProps.value.company_size !== null ? slotProps.value.company_size : 'N/A' }}</div>
                        </div>
                        <span v-else>
                          {{ slotProps.placeholder }}
                        </span>
                      </template>
                      
                      <template #option="slotProps">
                        <div class="flex items-center">
                          <div>{{ slotProps.option.company_size !== null ? slotProps.option.company_size : 'N/A' }}</div>
                        </div>
                      </template>
                    </Select>
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label for="company_search_url">URL ค้นหาบริษัท</label>
                  </div>
                  <div class="col-sm-9">
                    <InputText name="company_search_url" id="company_search_url" class="w-100" />
                  </div>
                </div>
              </div>

              <!-- <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label for="verified">ยืนยันบริษัทแล้ว</label>
                  </div>
                  <div class="col-sm-9">
                    <ToggleButton name="verified" onLabel="ใช่" offLabel="ไม่ใช่" onIcon="pi pi-check" offIcon="pi pi-times" />
                  </div>
                </div>
              </div> -->

              <div class="d-flex justify-content-end mt-4">
                <Button type="button" label="ยกเลิก" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button type="submit" label="บันทึก" icon="pi pi-check" class="p-button-text" />
              </div>
            </div>
          </Form>
        </Dialog>

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
  </div>
</template>

<script>
import TheSidebar from "@/components/admin/TheSidebar.vue";
import axios from "axios";
import { ref, onMounted, reactive } from "vue";

// นำเข้า PrimeVue Components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import ToggleButton from 'primevue/togglebutton';
// import Badge from 'primevue/badge';
import Tag from 'primevue/tag';
import { FilterMatchMode } from "@primevue/core/api";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Select from 'primevue/select';
import { Form } from '@primevue/forms';
import Message from 'primevue/message';


export default {
  name: "TheCompany",
  components: {
    TheSidebar,
    DataTable,
    Column,
    Button,
    InputText,
    Dialog,
    Dropdown,
    ToggleButton,
    Tag,
    IconField,
    InputIcon,
    Select,
    Form,
    Message,

  },

  setup() {
    // const toast = useToast();
    // const formRef = ref(null);
    const companies = ref([]);
    const industries = ref([]);
    const companySizes = ref([]);
    const loading = ref(true);
    const companyDialog = ref(false);
    const deleteCompanyDialog = ref(false);
    const companyDetailVisible = ref(false);
    const selectedCompany = ref(null);
    
    // ค่าเริ่มต้นสำหรับฟอร์ม PrimeVue
    const initialValues = ref({
      company_id: null,
      name: '',
      short_name: '',
      industry: null,
      verified: 0,
      company_search_url: '',
      company_size: null,
      registration_date: null
    });
    
    const filters = reactive({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // ตัวแปรสำหรับ Notification Dialog (แทน Toast)
    const notificationDialog = reactive({
      visible: false,
      header: '',
      message: '',
      icon: '',
      callback: null // ฟังก์ชันที่จะเรียกหลังจากปิด notification
    });

    // resolver สำหรับตรวจสอบข้อมูล
    const resolver = ({ values }) => {
      const errors = {
        name: [],
      };

      // ตรวจสอบชื่อบริษัท
      if (!values.name || values.name.trim() === '') {
        errors.name.push({ type: 'required', message: 'กรุณาระบุชื่อบริษัท' });
      }

      return {
        values,
        errors
      };
    };

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


    // ฟังก์ชันเรียกข้อมูลบริษัททั้งหมด
    const fetchCompanies = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/company');
        if (response.data.status === 'success') {
          companies.value = response.data.data;
        }
      } catch (error) {
        showNotification('error', 'เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลบริษัทได้');
        console.error('Error fetching companies:', error);
      } finally {
        loading.value = false;
      }
    };

    // ฟังก์ชันเรียกข้อมูลอุตสาหกรรม
    const fetchIndustries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/company/industry');
        if (response.data.status === 'success') {
          industries.value = response.data.data;
          console.log('อุตสาหกรรม:', industries.value);
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    // ฟังก์ชันเรียกข้อมูลขนาดบริษัท
    const fetchCompanySizes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/company/company_size');
        if (response.data.status === 'success') {
          companySizes.value = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching company sizes:', error);
      }
    };

    // เปิดไดอะล็อกเพิ่มบริษัทใหม่
    const openNewCompany = () => {
      initialValues.value = {
        company_id: null,
        name: '',
        short_name: '',
        industry: null,
        verified: 0,
        company_search_url: '',
        company_size: null,
        registration_date: null
      };

      // รีเซ็ตฟอร์ม
      // setTimeout(() => {
      //   formRef.value?.resetValues();
      // }, 100);
      
      companyDialog.value = true;
    };

    // ซ่อนไดอะล็อก
    const hideDialog = () => {
      companyDialog.value = false;
    };

    // บันทึกข้อมูลบริษัท (ถูกเรียกจาก Form submit)
    const onFormSubmit = async ({ values, valid }) => {
      if (!valid) {
        showNotification(
            'error', 
            'ข้อมูลไม่ครบถ้วน', 
            `กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน`, 
          );
        // toast.add({ severity: 'error', summary: 'ข้อมูลไม่ครบถ้วน', detail: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', life: 3000 });
        return;
      }

      try {
        // เตรียมข้อมูลสำหรับส่งไป API
        let companyData = {
          "company_id": null,
          "name": values.name,
          "short_name": values.short_name || null,
          "industry": values.industry ? values.industry.industry : null,
          "verified": values.verified ? 1 : 0,
          "company_search_url": values.company_search_url || null,
          "company_size": values.company_size ? values.company_size.company_size : null,
          "registration_date": values.registration_date || null
        };

        let response;
        
        // ถ้ามี company_id แสดงว่าเป็นการแก้ไข
        if (values.company_id) {
          companyData.company_id = values.company_id;
          response = await axios.put(`http://127.0.0.1:8000/company/${values.company_id}`, companyData);
        } else {
          // ถ้าไม่มี company_id แสดงว่าเป็นการเพิ่มใหม่
          console.log('companyData:', companyData);
          response = await axios.post('http://127.0.0.1:8000/company', companyData);
          console.log('response:', response.data);
        }

        // ตรวจสอบผลลัพธ์จาก API
        if (response.data.status === 'success') {
          // แสดงข้อความสำเร็จ
          showNotification(
            'success', 
            'บันทึกสำเร็จ', 
            `${companyData.company_id ? 'แก้ไข' : 'เพิ่ม'}ข้อมูลบริษัทเรียบร้อยแล้ว`, 
          );
          
          // ซ่อนไดอะล็อก
          hideDialog();
          fetchCompanies();
        } else {
          showNotification('error', 'เกิดข้อผิดพลาด', response.data.message || 'ไม่สามารถบันทึกข้อมูลได้');
        }
      } catch (error) {
        // จัดการข้อผิดพลาดจาก API
        console.error('Error saving company:', error);
        
        // ตรวจสอบว่ามีข้อความ error จาก API หรือไม่
        const errorMessage = error.response?.data?.message || 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง';
        showNotification('error', 'เกิดข้อผิดพลาด', errorMessage);

      }
    };

    onMounted(() => {
      fetchCompanies();
      fetchIndustries();
      fetchCompanySizes();
    });

    return {
      // formRef,
      companies,
      industries,
      companySizes,
      loading,
      companyDialog,
      deleteCompanyDialog,
      companyDetailVisible,
      selectedCompany,
      initialValues,
      filters,
      notificationDialog,
      resolver,
      showNotification,
      closeNotification,
      fetchCompanies,
      fetchIndustries,
      fetchCompanySizes,
      openNewCompany,
      hideDialog,
      onFormSubmit,
    };
  }
};
</script>

<style scoped>
.text-success {
  color: #198754;
}

.text-danger {
  color: #dc3545;
}

.text-warning {
  color: #ffc107;
}

.text-info {
  color: #0dcaf0;
}

/* กำหนดความสูงสูงสุดของ Dialog */
::v-deep(.p-dialog-content) {
  max-height: 80vh;
  overflow-y: auto;
}

/* ปรับขนาดและสีของข้อความแจ้งเตือน */
:deep(.p-message) {
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

:deep(.p-message .p-message-wrapper) {
  padding: 0.3rem 0.5rem;
}

:deep(.p-invalid) {
  border-color: #dc3545 !important;
}
</style>