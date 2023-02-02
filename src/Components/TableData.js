import React , {useState , useEffect } from 'react'
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Table, Row, Col } from 'antd';
import axios from 'axios';
import { Modal, Button } from 'antd';

const TableData = () =>{
  const [data, setdata] = useState([]);
  const [modaldata, setmodaldata] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'uname',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'uorigin',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'uowner',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'ustatus',
    },
    {
      title: 'History',
      dataIndex: 'id',
      key: 'id',
      render: (index, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Show History
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    setdata(
      res.data.map((row) => ({
        key: row.id,
        name: row.name,
        origin: row.email,
        owner: row.address.city,
        status: row.phone,
      }))
    );
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Header style={{background:'white', fontWeight:'bold',fontSize:"120%"}}>Inventory</Header>
      <Content style={{ padding: 50 }}>
        <Row>
          <Col span={3} />
          <Col span={18}>
            <Table dataSource={data} columns={columns} />
          </Col>
          <Col span={3} />
        </Row>
      </Content>
      <Modal
        title="Basic Modal"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Name: {modaldata.name}</p>
        <p>Origin: {modaldata.origin}</p>
        <p>Owner: {modaldata.owner}</p>
        <p>Status: {modaldata.status}</p>
      </Modal>
      <Footer></Footer>
    </Layout>
  );
};

export default TableData;