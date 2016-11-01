"use strict";
var User = (function () {
    function User() {
    }
    User.prototype.deserialize = function (input) {
        return JSON.parse(input._body)[0];
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map