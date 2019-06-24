define(["dojo/_base/declare", "Common/Department"], function (declare, Department) {
    // Create a new class
    var Employee = declare(Department, {
        // The default username
        EmployeeId: null,
        FirstName: null,
        SecondName: null,
        // The constructor
        constructor: function (args) {
            this.inherited(arguments);
            declare.safeMixin(this, args);
        }
    });
    return Employee;
});
