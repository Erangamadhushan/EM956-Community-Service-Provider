var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b, _c;
    (_a = document.getElementById("fetchUsersBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", fetchUsers);
    (_b = document.getElementById("addUserBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addUser);
    (_c = document.getElementById("checkHealthBtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", checkHelth);
    // Initial fetch of users
    fetchUsers();
});
var API_BASE_URL = "/api/";
function showState(message, isError) {
    if (isError === void 0) { isError = false; }
    var statusDiv = document.getElementById("status");
    statusDiv.textContent = message;
    statusDiv.className = "status ".concat(isError ? 'error' : 'success');
    setTimeout(function () {
        statusDiv.textContent = '';
    }, 3000);
}
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var response, users, usersDiv, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL, "users"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    users = _a.sent();
                    usersDiv = document.getElementById("users");
                    if (users.length === 0) {
                        usersDiv.innerHTML = "<p>No users found.</p>";
                        return [2 /*return*/];
                    }
                    usersDiv.innerHTML = users.map(function (user) { return "\n            <div class=\"user\">\n                <strong>".concat(user.name, "</strong> - ").concat(user.email, "<br/>\n                ID: ").concat(user.id, "\n            </div>\n        "); }).join("");
                    showState("Users fetched successfully");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching users:", error_1);
                    showState("Failed to fetch users", true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addUser() {
    return __awaiter(this, void 0, void 0, function () {
        var nameInput, emailInput, response, error_2;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    nameInput = (_b = (_a = document.getElementById('userName')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim();
                    emailInput = (_d = (_c = document.getElementById('userEmail')) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.trim();
                    if (!nameInput || !emailInput) {
                        showState("Please provide both name and email.", true);
                        return [2 /*return*/];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL, "users"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ name: nameInput, email: emailInput })
                        })];
                case 2:
                    response = _e.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    showState("User added successfully");
                    fetchUsers(); // Refresh the user list
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _e.sent();
                    console.error("Error adding user:", error_2);
                    showState("Failed to add user", true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function checkHelth() {
    return __awaiter(this, void 0, void 0, function () {
        var response, health, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL, "health"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    health = _a.sent();
                    showState("Service is ".concat(health.status, " - ").concat(new Date(health.time).toLocaleString()), health.status === "UP" ? false : true);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error checking health:", error_3);
                    showState("Failed to check health", true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
