
/**
 * A collection of locators for the Employee List Page.
 * 
 */
/**
 * Locators for the Employee Page.
 */
export const employeeLocators = {
    /**
     * Locator for the PIM link in the sidebar.
     */
    sidebarPIM: ['link', { name: 'PIM' }],

    /**
     * Locator for the "Add Employee" link in the top bar menu.
     */
    topBarMenuAddEmployee: ['link', { name: 'Add Employee' }],

    /**
     * Locator for the "Employee List" link in the top bar menu.
     */
    topBarMenuEmployeeList: ['link', { name: 'Employee List' }],

    /**
     * Locator for the "Add Employee" title heading.
     */
    addEmployeeTitle: ['heading', { name: 'Add Employee' }],

    /**
     * Locator for the "Personal Details" title heading.
     */
    employeeInfoTitle: ['heading', { name: 'Personal Details' }],

    /**
     * Locator for the "First Name" textbox.
     */
    firstName: ['textbox', { name: 'First Name' }],

    /**
     * Locator for the "Middle Name" textbox.
     */
    middleName: ['textbox', { name: 'Middle Name' }],

    /**
     * Locator for the "Last Name" textbox.
     */
    lastName: ['textbox', { name: 'Last Name' }],

    /**
     * Locator for the "Employee Id" input field.
     */
    employeeId: '.oxd-input-group:has(label.oxd-label:has-text("Employee Id")) input',

    /**
     * Locator for the "Save" button.
     */
    saveButton: ['button', { name: 'Save' }],

    /**
     * Locator for the "Cancel" button.
     */
    cancelButton: ['button', { name: 'Cancel' }],

    /**
     * Locator for the successful message toast.
     */
    succefulMessage: '.oxd-toast-content .oxd-toast-content-text.oxd-text--toast-message',

    /**
     * Locator for the Employee List table.
     */
    employeeList: ['table', { name: 'Employee List' }],

    /**
     * Locator for the Employee List table.
     */
    employeeListTable: ['table', { name: 'Employee List' }],

    /**
     * Locator for the rows in the Employee List table.
     */
    employeeListTableRows: ['tableRows', { name: 'Employee List' }],

    /**
     * Locator for the columns in the Employee List table.
     */
    employeeListTableColumns: ['tableColumns', { name: 'Employee List' }],

    /**
     * Locator for the data in the Employee List table.
     */
    employeeListTableData: ['tableData', { name: 'Employee List' }],

    /**
     * Locator for the data rows in the Employee List table.
     */
    employeeListTableDataRows: ['tableDataRows', { name: 'Employee List' }],

    /**
     * Locator for the data columns in the Employee List table.
     */
    employeeListTableDataColumns: ['tableDataColumns', { name: 'Employee List' }],

    /**
     * Locator for the data cells in the Employee List table.
     */
    employeeListTableDataCells: ['tableDataCells', { name: 'Employee List' }],

    /**
     * Locator for a single data cell in the Employee List table.
     */
    employeeListTableDataCell: ['tableDataCell', { name: 'Employee List' }],

    /**
     * Locator for the "firstNameError" input in the Employee add page.
     */
    firstNameError: 'div.oxd-input-group:has(div > input.orangehrm-firstname) > span.oxd-input-field-error-message',

    /**
     * Locator for the "lastNameError" input in the Employee add page.
     */
    lastNameError: 'div.oxd-input-group:has(div > input.orangehrm-lastname) > span.oxd-input-field-error-message',
}