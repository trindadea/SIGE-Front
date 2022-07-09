const { default: MASTER } = require("../masterApi/http-common")

const REAL_TIME_PATH = "/realtime-measurements/"

const getRealTimeMeasurement = async (transductorId) => {
  let realTimeMeasurement = undefined;

  await MASTER
    .get(`${REAL_TIME_PATH}?id=${transductorId}`)
    .then((res) => {
      realTimeMeasurement = res.data[0]
    })
    .catch((err) => {
      this.errors.push(err)
      console.error(err)
    });
    return realTimeMeasurement;
}

export { getRealTimeMeasurement }