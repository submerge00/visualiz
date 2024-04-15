import React,{useEffect,useState} from "react";
import {Button,Drawer,Form,Input} from "antd";
import {$add,$getone,$update}from './dataApi';
export default function AddData({open,setOpen,loadList,deviceid,setdeviceid}){
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
    const onFinish = (values) => {
        if(deviceid){
            $update(deviceid).then(()=>{
                console.log(deviceid)
                 
                 loadList()
             })
           /*$update(deviceid).then(({success,message})=>{
           if(success){
            loadList()
            console.log(deviceid)
           }else{
           }
        })*/
        }else{
            /*$add(values).then(({success,message})=>{
           if(success){
            
            clear()
            loadList()
           }else{

           }
        })*/
        $add(values).then(()=>{
            
             clear()
             loadList()
             setOpen(false)
         })
        }
        
      };
      //清空表单
      const clear=()=>{
        form.setFieldsValue({device_id:""})
        form.setFieldsValue({Name:""})
        form.setFieldsValue({model:""})
        form.setFieldsValue({locate:""})
        form.setFieldsValue({monitor:""})
      }
      //关闭抽屉
    const onClose=()=>{
        clear()//清空表单
        setdeviceid(0)//取消编辑状态
        setOpen(false)//关闭抽屉
    }
    return (
        <>
        <Drawer title={deviceid?'修改角色':'添加角色'}
         width={500} onClose={onClose} open={open}>
        <Form 
            name="basic"
            form={form}
            labelCol={{
            span: 4,
            }}
            wrapperCol={{
            span: 20,
            }}
            style={{
            maxWidth: 700,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
            label="编号"
            name="id"
            hidden
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="编号"
            name="device_id"
            rules={[
                {
                required: true,
                message: '请输入设备编号',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="名字"
            name="Name"
            rules={[
                {
                required: true,
                message: '请输入设备名字',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="型号"
            name="model"
            rules={[
                {
                required: true,
                message: '请输入型号',
                },
            ]}
            >
            <Input />
            </Form.Item>


            <Form.Item
            wrapperCol={{
                offset: 4,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                {deviceid?'修改':'添加'}
            </Button>
            <Button onClick={clear} style={{marginLeft:'10px'}}>
                取消
            </Button>
            </Form.Item>
        </Form>
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