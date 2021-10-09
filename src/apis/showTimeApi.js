import callApi from "utils/callApi";

const showTimeApi = {
    addShowTime(showTime, accessToken) {
        return callApi('QuanLyDatVe/TaoLichChieu', 'POST', showTime, accessToken)
    },
}

export default showTimeApi;