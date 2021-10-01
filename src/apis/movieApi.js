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
    }
}

export default movieApi;