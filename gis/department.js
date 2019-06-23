define(["dojo/_base/declare"], function (declare) {
    var Department = declare(null, {
        // The default username
        DepartmentId: null,
        DepartmentName: null,
        // The constructor
        constructor: function (args) {
            declare.safeMixin(this, args);
        }
    });
    return Department;
});
