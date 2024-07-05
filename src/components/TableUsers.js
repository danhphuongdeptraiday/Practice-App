import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";

import ModalAddNew from "./ModalAddNew";

function TableUsers(props) {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [toggle, setToggle] = useState(false);

  const handleAddNewUser = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    // Call API
    console.log("To ne");
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      console.log(res);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
    // convert string to number
  };

  const handleUpdateTable = (user) => {
    console.log(user);
    setListUsers([user, ...listUsers]);
  };

  return (
    <>
      <div className="my-3 add-new d-flex justify-content-between">
        <span>
          <h3>List user:</h3>
        </span>
        <button onClick={handleAddNewUser} className="btn btn-success">
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModalAddNew
        show={toggle}
        handleClose={handleAddNewUser}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
}

export default TableUsers;
