import axios from "../src/request";

//设备列表
export const $list=async()=>{
    let {data}=await axios.get('device')
    return data
}
/*export const $list=async(params)=>{
    let {data}=await axios.get('device',{params})
    return data
}*/

//添加设备
export const $add=async(params)=>{
    let {data}=await axios.post('device',params)
    return data
}

//删除设备
export const $del=async(params)=>{
    let {data}=await axios.delete(`device/${params}`,params)
    return data
}

//获取单个角色
export const $getone=async(params)=>{
    let {data}=await axios.get('device',{params})
    return data
}

//修改角色
export const $update=async(params)=>{
    let {data}=await axios.put(`device/${params}`,params)
    return data
}