import { fetchFail, fetchStart, getDataSuccess } from "../features/dataSlice";
import { putSuccess} from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";


const useDataCall = () => {

  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();
  const { userId } = useSelector((state) => state.auth); 

  /* -------------------------------------------------------------------------- */
  /*                             Get Data with Axios                            */
  /* -------------------------------------------------------------------------- */

  const getData = async (url) => {
    // url is the parameter added to the end of the URL. For example: url=doctors, url= patients, url= messages
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/${url}`); 
      dispatch(getDataSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*             Get Single Data with Axios                         */
  /* -------------------------------------------------------------------------- */

  const getSingleData = async (url, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/${url}/${userId}`);
      if (url === "events") {
        dispatch(getDataSuccess({ data: data?.data, url: "events" }));
      } else if (url === "appointments") {
        dispatch(
          getDataSuccess({
            data: data?.data,
            url: "appointments",
          })
        );
        //console.log(data.data)
      } else if (url === "messages") {
        dispatch(
          getDataSuccess({
            data: data?.data,
            url: "messages",
          })
        );
        //console.log(data.data)
      } else {
        dispatch(getDataSuccess({ data: data?.data, url }));
      }
      //console.log(data)
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            Post Data with Axios                            */
  /* -------------------------------------------------------------------------- */


  const postData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/`, info);
      if (url === "events" || url === "appointments" || url==="tasks" || url==="messages" || url==="notes") getSingleData(url, userId);
      else getData(url);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                           Update Data with Axios                           */
  /* -------------------------------------------------------------------------- */

  const putData = async (url, id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/${url}/${id}`, info);
      if (url === "events" || url === "appointments" || url==="tasks" || url==="notes") getSingleData(url, userId);
      else getData(url);
      if(url==="doctors" || url==="patients" || url==="admins") { dispatch(putSuccess({info})); getData(url);}
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            Delete Data with Axios                          */
  /* -------------------------------------------------------------------------- */

    const delData = async (url, id) => { 
        dispatch(fetchStart())
        try {
            await axiosWithToken.delete(`/${url}/${id}`)
            if(url==="tasks" || url==="notes" || url === "events" || url === "appointments") getSingleData(url,id)
            else getData(url)

        } catch (error) {
            dispatch(fetchFail())
            console.log(error);
        }
    }


  return {
    getData,
    postData,
    putData,
    delData,
    getSingleData,
  };
};
export default useDataCall;

