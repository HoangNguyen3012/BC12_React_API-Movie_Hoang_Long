import { GROUP_ID } from "settings/apiConfig";
import callApi from "utils/callApi";

const cinemaApi = {
    fetchAllCinemaSystem() {
        return callApi('QuanLyRap/LayThongTinHeThongRap');
    },

    fetchAllCinema(cinemaSystem) {
        return callApi(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaSystem}`)
    }
}

export default cinemaApi