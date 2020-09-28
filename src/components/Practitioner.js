import React, { useState, useEffect } from "react";
import { getPractitioners } from "../services";
import PractitionerCard from './PractitionerCard'



const Practitioner = () => {

  //state hooks
  const [practitioners, setPractitioners] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)

  //get practitioners and set state, remove loading state when resolved
  useEffect(() => {
      
      getPractitioners().then((res) => {
          setPractitioners(flattenPractitionerObj(res))
          setLoading(false)
      })
  }, [])


  const flattenPractitionerObj = (response) => {
      return (response.data.entry || []).map((item) => {
        const name = item.resource.name || [];
        return {
          id: item.resource.id,
          name: `${((name[0] || {}).given || []).join(" ")} ${
            (name[0] || {}).family
          }`,
          gender: item.resource.gender,
          dob: item.resource.birthDate,
          photo:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        };
      });
  };

  //called from practitionercard child, filters practitioner array, removes deleted practitioner, and rerenders
  const handlePractitionerDelete = (id) => {

    const updatedPractitioners = practitioners.filter(practitioner => practitioner.id !== id)

    setPractitioners(updatedPractitioners)

  }

  //sets error state when self destruct button is pressed
  const crashMe = () => {
    setErr(true)
  }

  //throws error if one exists, will be caught by errorboundary 
  if (err) {
    throw new Error('You clicked the self-destruct button')
  }

  return(

    <div>
        {/* Return loading message if practitioner request is unresolved */}
        {loading ? 
          <div>
            LOADING...
          </div>
        : 
          <div>
            

            <button onClick={() => crashMe()}>Click me to test ErrorBoundary</button>
            
            {practitioners.map((practitioner) => (
              <PractitionerCard data={practitioner} key={practitioner.id} deleteMe={handlePractitionerDelete}/>
            ))}
          </div>
        }
    </div>
  )
}

export default Practitioner