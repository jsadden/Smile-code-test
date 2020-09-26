import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://hapi.fhir.org/baseR4",
});

export function getPatients(name=null, birthDate=null) {
  let query= ''

  //build query string
  if (name && birthDate) {
    query = '?name=' + name + '&birthdate=' + birthDate
  } else if (name) {
    query = '?name=' + name
  } else if (birthDate) {
    query = '?birthdate=' + birthDate
  }

  return axios.get("/Patient" + query);
};

export const getPractitioners = () => {
  return axios.get("/Practitioner");
};
