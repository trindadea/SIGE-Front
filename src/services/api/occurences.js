const { default: MASTER } = require("../masterApi/http-common")

const OCCURENCES_URL = '/occurences/?type=period&';

const getTransductorsLast72h = async (transductorId) => {
  let transductor_occurences = {};
  await MASTER
    .get(`${OCCURENCES_URL}id=${transductorId}`)
    .then((res) => {
      transductor_occurences = res.data
    })
    .catch((err) => {
      this.errors.push(err)
      console.error(err)
    })
  return transductor_occurences;
}

const getCampusLast72hEvents = async (campus) => {
  let last72hEvents = {};
  await MASTER
    .get(`${OCCURENCES_URL}campus=${campus.id}`)
    .then((res) => {
      last72hEvents = res.data
      last72hEvents.campus_name = campus.name
    })
    .catch((err) => { console.error(err) })
  
    return last72hEvents
}


export {getTransductorsLast72h, getCampusLast72hEvents}