import { GROUP_ID } from "settings/apiConfig";
import callApi from "utils/callApi";

const userApi = {
    loginApi(user) {
        return callApi('QuanLyNguoiDung/DangNhap', 'POST', user);
    },

    signupApi(user) {
        return callApi('QuanLyNguoiDung/DangKy', 'POST', user);
    },

    fetchUserInfoApi(user) {
        return callApi('QuanLyNguoiDung/ThongTinTaiKhoan', 'POST', user);
    },

    addUserApi(user, token) {
        return callApi('QuanLyNguoiDung/ThemNguoiDung', 'POST', user, token);
    },

    editUserApi(user, token) {
        return callApi('QuanLyNguoiDung/CapNhatThongTinNguoiDung', 'PUT', user, token);
    },

    deleteUserApi(taiKhoan, token) {
        return callApi(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, 'DELETE', taiKhoan, token);
    },

    findUserApi(groupID, keyword) {
        return callApi(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${groupID}&tuKhoa=${keyword}`, 'GET', groupID, keyword);
    },

    fetchAllUserApi() {
        return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`, 'GET')
    },
};

export default userApi;