import React,{useEffect,useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import {Table,Button, Input, Space,Popconfirm,Pagination} from "antd";
import Highlighter from 'react-highlight-words';
import {$list,$del}from './dataApi';
import AddData from './AddData'
import DataDetail from './Detail'
export default function Data(){
    //搜索
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={'请输入'}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              查找
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              重置
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              关闭
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    //总数量
    let [count,setCount]=useState(1)
    //页码
    let [pageIndex,setPageIndex]=useState(1)
    //编辑状态
    let [deviceid,setdeviceid]=useState(0)
    //是否打开抽屉
    const [open, setOpen] = useState(false);
    //是否打开抽屉
    const [opend, setOpend] = useState(false);
    //角色列表数据
    let [dataList,setDataList]=useState([])
    useEffect(()=>{
        loadList()
    },[pageIndex])
    //加载列表数据
    const loadList =()=>{
        $list({pageSize:14,pageIndex}).then(({data,count})=>{
            data=data.map(r=>{
                return {
                    ...r,
                    key:r.id
                }
            })
            setDataList(data)
            setCount(count)
        })
    }
    //查看详情
    const detail=(id)=>{
      setOpend(true)//打开抽屉
      setdeviceid(id)
    }
    //编辑
    const edit=(id)=>{
      setOpen(true)//打开抽屉
      setdeviceid(id)//设置为编辑状态
    }
    //删除
    const del=(id)=>{
      /*$del(id).then(({success,message})=>{
        if(success){
          loadList()
        }else{

        }
      })*/
      $del(id).then(()=>{
          loadList()
      })
    }
      const columns = [
        {
            title: '编号',
            dataIndex: 'DeviceNo',
            key: 'DeviceNo',
            width:'220px',
            ...getColumnSearchProps('DeviceNo'),
        },
        {
          title: '名字',
          dataIndex: 'Name',
          key: 'Name',
          width:'220px',
          ...getColumnSearchProps('Name'),
        },
        {
          title: '型号',
          dataIndex: 'ModelData',
          key: 'ModelData',
          width:'220px',
          ...getColumnSearchProps('ModelData'),
        },/*
        {
          title: '位置',
          dataIndex: 'Location',
          key:'Location',
          width:'200px',
        },
        {
          title: '监控数据',
          dataIndex: 'monitor',
          key: 'monitor',
          width:'200px',
          
        },*/
        {
          title: '操作',
          key: 'action',
          render: (ret) => (
            <>
            <Button size="small" style={{borderColor:'blue',color:'blue'}} onClick={()=>{
              detail(ret.id)
            }}>查看详情</Button>
            <Button size="small" style={{borderColor:'orange',color:'orange',marginLeft:'5px'}} onClick={()=>{
              edit(ret.id)
            }}>编辑</Button>
            <Popconfirm
              title="提示"
              description="确定删除吗?"
              onConfirm={()=>{del(ret.id)}}
              okText="确定"
              cancelText="取消"
            >
              <Button danger style={{marginLeft:'5px'}} size="small" >删除</Button>
            </Popconfirm>
            </>
            
          ),
        },
      ];
    return (
    <>
        <div className="search">
            <Button size="small" onClick={()=>{setOpen(true)}}>添加</Button>
        </div>
        <Table size="small" dataSource={dataList} columns={columns} pagination={false} scroll={{y: 520,}}/>
       
        <AddData open={open} setOpen={setOpen} loadList={loadList} deviceid={deviceid} setdeviceid={setdeviceid}/>
        <DataDetail opend={opend} setOpend={setOpend} loadList={loadList} deviceid={deviceid} setdeviceid={setdeviceid} />
    </>
    )
}
/*<Pagination size='small' defaultCurrent={pageIndex} total={count} pageSize={15} onChange={(page)=>{setPageIndex(page)}}/>*/