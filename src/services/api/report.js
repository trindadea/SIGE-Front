const { default: MASTER } = require("../masterApi/http-common")
import moment from "moment";

class Report {

    getReports = async (startDate, campus, group) => {
        const endDate = this._getLastDayMonth(startDate);

        const params = {
            start_date: `${startDate} 00:00:00`,
            end_date: `${endDate} 23:59:59`,
            campus: campus
        };

        if (group) {
            params.group = group;
        }

        try {
            const response = await MASTER.get('/report/', { params: params });
            return response.data;
        } catch (err) {
            console.error("Error fetching reports:", err);
            throw err;
        }
    }

    async getUfer(startDate, campus, group) {
        const endDate = this._getLastDayMonth(startDate);

        const params = {
            start_date: `${startDate} 00:00:00`,
            end_date: `${endDate} 23:59:59`,
            campus: campus
        };

        if (group) {
            params.group = group;
        }

        try {
            const response = await MASTER.get('/ufer/', { params: params });
            return response.data;
        } catch (err) {
            console.error("Error fetching ufer:", err);
            throw err;
        }
    }

    _getLastDayMonth(date) {
        return moment(date).endOf('month').format('YYYY-MM-DD');
    }
}

export default new Report();
