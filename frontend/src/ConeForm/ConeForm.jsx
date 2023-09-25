import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import Cone from "./Cone";
function ConeForm() {
    let [data,setData] = useState([])
    return (
      <div> 
        
       <Formik
        initialValues={{ height: 0, radius: 0, segments: 3 }}
        validationSchema={Yup.object({
          height: Yup.number().required("Required"),
          radius: Yup.number().required("Required"),
          segments: Yup.number().required("Required"),
        })}
        onSubmit={(values) => {
            axios.post('http://localhost:3001/api', values)
            .then(response => {
            setData(response.data)
            })
            .catch(error => {
            console.error(error);
            });
        }}
      >
        {(formik) => (
          <Form>
            <div>
              <label htmlFor="height">Height</label>
              <Field type="number" id="height" name="height" />
              {formik.touched.height && formik.errors.height ? (
                <div>{formik.errors.height}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="radius">Radius</label>
              <Field type="number" id="radius" name="radius" />
              {formik.touched.radius && formik.errors.radius ? (
                <div>{formik.errors.radius}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="segments">Segments</label>
              <Field type="number" id="segments" name="segments" min={3} />
              {formik.touched.segments && formik.errors.segments ? (
                <div>{formik.errors.segments}</div>
              ) : null}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik> 
      <Cone data={data}/>  
      </div>
    );
  }
  
  export default ConeForm;