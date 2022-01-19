import { DatePipe } from '@angular/common';

export let settings = {
  actions: { add: false, edit: false, delete: false },
  columns: {
    name: {
      title: 'Name',
      filter: true
    },
    description: {
      title: 'Description',
      filter: true
    },
    status: {
      title: 'Status',
      filter: true
    },
    creation_date: {
      title: 'Date',
      valuePrepareFunction: (date) => { 
        let raw = new Date(date);

        let formatted = new DatePipe('en-EN').transform(raw, 'dd MMM yyyy HH:mm:ss');
        return formatted;
      }
    }
  },
  delete: {
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  }
};