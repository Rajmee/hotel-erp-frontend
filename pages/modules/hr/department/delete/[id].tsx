import { useRouter } from "next/router";
import { getToken } from '../../../../utils/getdata';
import axios from 'axios';
import useSWR from 'swr';
import { ToastContainer, toast } from 'react-toastify';
const Delete = () => {
    const router = useRouter();
    const { id } = router.query;
    const userData = getToken();
    const response = userData.response && userData.response;
    const notify = (msg:any) => toast(msg);
    const token:any = {
        Authorization: `Bearer ${response}`
       }
            const header = {
                headers: token,
            };
            const body = {
            action: "deleteDepartment",
            department: id,
            };

            const fetcher1 = async (url:string, bodyPart:any, head:any) => await axios.post(url,body,header).then((res) => res.data);
            const { data, error } = useSWR('http://hotel.api/app/hrm/departments', fetcher1);
            if(!data){
                notify('Someting went wrong!');
                return false;
            }else{
                notify('Item Deleted Successfully!');
                router.push('modules/hr/department/list');
            }

            return (
                <>
                 <ToastContainer position="top-center"
                draggable
                closeOnClick
                />
                </>
            )
}

export default Delete