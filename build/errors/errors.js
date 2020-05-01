"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationError = (function () {
    function ApplicationError(statusCode, rsn) {
        this.statusCode = statusCode;
        this.message = 'An unexpected error ocurred.';
        this.timestamp = new Date();
        rsn ? (this.reason = rsn) : this.reason = 'Unspecified reason.';
    }
    ApplicationError.prototype.setMessage = function (message) {
        this.message = message;
    };
    return ApplicationError;
}());
var DataNotFoundError = (function (_super) {
    __extends(DataNotFoundError, _super);
    function DataNotFoundError(reason) {
        var _this = _super.call(this, 404, reason) || this;
        _super.prototype.setMessage.call(_this, 'No data found.');
        return _this;
    }
    return DataNotFoundError;
}(ApplicationError));
exports.DataNotFoundError = DataNotFoundError;
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(reason) {
        var _this = _super.call(this, 400, reason) || this;
        _super.prototype.setMessage.call(_this, 'Invalid parameters provided');
        return _this;
    }
    return BadRequestError;
}(ApplicationError));
exports.BadRequestError = BadRequestError;
var DataSaveError = (function (_super) {
    __extends(DataSaveError, _super);
    function DataSaveError(reason) {
        var _this = _super.call(this, 409, reason) || this;
        _super.prototype.setMessage.call(_this, 'Could not save Data');
        return _this;
    }
    return DataSaveError;
}(ApplicationError));
exports.DataSaveError = DataSaveError;
