import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export async function fetchData(){
    // <ToastContainer/>
      try {
        const requrl = " http://localhost:3000/getData";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}

export async function getIntensity(){
    try {
        const requrl = " http://localhost:3000/getData/getIntensity";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}
export async function getLikelihood(){
    try {
        const requrl = " http://localhost:3000/getData/getLikelihood";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}
export async function getRelevance(){
    try {
        const requrl = " http://localhost:3000/getData/getRelevance";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}
export async function getYear(){
    try {
        const requrl = " http://localhost:3000/getData/getYear";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}
export async function getCountry(){
    try {
        const requrl = " http://localhost:3000/getData/getCountry";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}
export async function getTopics(){
    try {
        const requrl = " http://localhost:3000/getData/getTopics";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}
export async function getRegion(){
    try {
        const requrl = " http://localhost:3000/getData/getRegion";
        const result = await axios.get(requrl);
        if(result.data){
            return result.data
        }
      } catch (error) {
              console.log(error);
            //   toast.error("Error in fetching data");
      }
}

// export async function getCity(){
//     try {
//         const requrl = " http://localhost:3000/getCity";
//         const result = await axios.get(requrl);
//         if(result.data){
//             return result.data
//         }
//       } catch (error) {
//               console.log(error);
//             //   toast.error("Error in fetching data");
//       }
// }