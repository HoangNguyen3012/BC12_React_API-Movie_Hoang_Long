// const { GROUP_ID } = require("settings/apiConfig")
// const { default: callApi } = require("utils/callApi")
import { GROUP_ID } from "settings/apiConfig";
import callApi from "utils/callApi";

const movieApi = {
    fetchAllMovieApi() {
        return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
    },
    fetchMovieDetailApi(movieId) {
        return callApi(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
    },
    deleteMovieApi(movieId, token) {
        return callApi(`QuanLyPhim/XoaPhim?MaPhim=${movieId}`, 'DELETE', movieId, token);
    },
    editMovieUploadPictureApi(movieFormData, token) {
        return callApi('QuanLyPhim/CapNhatPhimUpload', 'POST', movieFormData, token);
    },
    addMovieUploadPictureApi(movieFormData) {
        return callApi('QuanLyPhim/ThemPhimUploadHinh', 'POST', movieFormData)
    }
}

export default movieApi;