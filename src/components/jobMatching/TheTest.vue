<!-- src/components/jobMatching/TheTest.vue -->
<template>
  <div class="bg-body-tertiary">
    <div class="container py-4">
      <h1 class="fw-bold h1 mb-0" style="color: #2a2d65">Test</h1>
    </div>
    <div class="card container px-4 py-4">
      <div class="flex justify-center mb-6">
        <DataTable
          :value="customers"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" text />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-download" text />
          </template>

          <Column field="name" header="Name" style="width: 25%"></Column>
          <Column
            field="country.name"
            header="Country"
            style="width: 25%"
          ></Column>
          <Column field="company" header="Company" style="width: 25%"></Column>
          <Column
            field="representative.name"
            header="Representative"
            style="width: 25%"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "TheTest",
  setup() {
    const customers = ref([]);

    onMounted(() => {
      customers.value = [
        {
          name: "John Doe",
          country: { name: "USA" },
          company: "Google",
          representative: { name: "Alice" },
        },
        {
          name: "Jane Smith",
          country: { name: "UK" },
          company: "Amazon",
          representative: { name: "Bob" },
        },
        {
          name: "Michael Johnson",
          country: { name: "Canada" },
          company: "Facebook",
          representative: { name: "Charlie" },
        },
        {
          name: "Emily Brown",
          country: { name: "Germany" },
          company: "Tesla",
          representative: { name: "Dave" },
        },
        {
          name: "Daniel Lee",
          country: { name: "Australia" },
          company: "Microsoft",
          representative: { name: "Eve" },
        },
        {
          name: "Sophia Wilson",
          country: { name: "France" },
          company: "Apple",
          representative: { name: "Frank" },
        },
        {
          name: "David Martinez",
          country: { name: "Spain" },
          company: "Samsung",
          representative: { name: "Grace" },
        },
        {
          name: "Olivia Taylor",
          country: { name: "Italy" },
          company: "Sony",
          representative: { name: "Henry" },
        },
        {
          name: "James Anderson",
          country: { name: "Japan" },
          company: "Panasonic",
          representative: { name: "Isabella" },
        },
        {
          name: "William Thomas",
          country: { name: "South Korea" },
          company: "LG",
          representative: { name: "Jack" },
        },
      ];
    });

    return { customers };
  },
};
</script>
