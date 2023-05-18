import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Analytics from "../components/Analytics";
import { message } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllPayment = () => {
  const [payments, setPayments] = useState();
  const [viewData, SetViewData] = useState("table");
  const navigate = useNavigate();

  //update payemnt
  const handleEdit = (id) => {
    navigate(`/editPayments/${id}`);
  };

  //delete
  const deleteRequest = async (id) => {
    const res = await axios
      .delete(`http://localhost:8080/api/v1/payments/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;

    return data;
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      deleteRequest(id)
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  //table data
  const columns = [
    {
      title: "Name on Card",
      dataIndex: "Hname",
    },
    {
      title: "Bank Name",
      dataIndex: "bank",
    },
    {
      title: "Card No",
      dataIndex: "card_number",
    },
    {
      title: "CVV",
      dataIndex: "cvv",
    },
    {
      title: "Ex.Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => handleEdit(record._id)} />

          <DeleteOutlined
            onClick={() => handleDelete(record._id.toString())}
            className="mx-3"
            style={{ color: "red" }}
          />
        </div>
      ),
    },
  ];

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8080/api/v1/payments/get-payment")
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setPayments(data.payments));
  }, []);
  console.log(payments);

  //search bar
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:8080/api/v1/payments/search/${key}`
      );
      result = await result.json();
      if (result) {
        setPayments(result);
      }
    } else {
      sendRequest().then((data) => setPayments(data.payments));
    }
  };

  //pdf downloding
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Serandip Travelers", 80, 15);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Report Of the Year 2023", 64, 23);

    // Extract the required columns from the payments data
    const tableData = payments.map(
      ({ Hname, bank, card_number, cvv, date, status }) => ({
        Hname,
        bank,
        card_number,
        cvv,
        date,
        status,
      })
    );

    // Remove the "Actions" column from columns array
    const tableColumns = columns.filter((col) => col.title !== "Actions");

    // Add the table to the PDF document
    doc.autoTable({
      theme: "grid",
      columns: tableColumns.map((col) => ({ ...col, dataKey: col.dataIndex })),
      body: tableData,
      startY: 30,
    });

    doc.save("table.pdf");
  };

  return (
    <Layout>
      <div className="filters">
        <div className="search">
          <input
            type="text"
            className="search-product-box"
            placeholder="Search Name"
            onChange={searchHandle}
          />
        </div>
        <div className="d-grid d-md-flex justify-content-md-end mb-3">
          <button className="btn btn-success" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={payments} />
        ) : (
          <Analytics payments={payments} />
        )}
      </div>
    </Layout>
  );
};

export default AllPayment;
