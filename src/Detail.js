import React,{useEffect,useState} from "react";
import {Descriptions,Drawer,Form,Input} from "antd";
import {$getone}from './dataApi';
export default function DataDetail({opend,setOpend,loadList,deviceid,setdeviceid}){
    //定义表单实例
    let [form]=Form.useForm()
    useEffect(()=>{
        if(deviceid!==0){
            
            $getone({deviceid}).then(data=>{
                form.setFieldValue(data)
                console.log(deviceid)
            })
        }
    },[deviceid])
    //表单提交方法
   
      //关闭抽屉
    const onClose=()=>{
        
        setdeviceid(0)//取消编辑状态
        setOpend(false)//关闭抽屉
    }
    const items = [
        {
          key: '1',
          label: '编号',
          children: '00057',
        },
        {
          key: '2',
          label: '名字',
          children: '冲压机XJ029',
        },
        {
          key: '3',
          label: '型号',
          children: '制造设备',
        },
        {
          key: '4',
          label: '位置',
          children: '112,120',
        },
        {
          key: '5',
          label: '速度',
          children: 'm/s',
        },
        {
            key: '6',
            label: '压力',
            children: 'empty',
        },
        {
            key: '7',
            label: '温度',
            children: 'empty',
        },
        {
            key: '8',
            label: '转速',
            children: 'empty',
        },
        {
            key: '9',
            label: '状态',
            children: 'empty',
        },
      ];
    return (
        <>
        <Drawer title={'设备详情'}
         width={500} onClose={onClose} open={opend}>
        <Descriptions items={items} column={2} />
        </Drawer>
        </>
    )
}
/*
<Form.Item
            label="位置"
            name="locate"
            rules={[
                {
                required: true,
                message: '请输入位置',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="监控数据"
            name="monitor"
            rules={[
                {
                required: true,
                message: '请输入监控数据',
                },
            ]}
            >
            <Input />
            </Form.Item>
            */