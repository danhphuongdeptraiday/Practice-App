import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { postCreateUser } from "../services/UserService";

import { useState } from "react";

function ModalAddNew(props) {
  const { handleClose, show, handleUpdateTable } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  //   Function Post API
  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);

    console.log(">>> Check Post: ", res);

    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("A user is created");
      handleUpdateTable({ id: res.id, first_name: name });
    } else {
      toast.error("Error...");
    }
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div>
              <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Job</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Job"
                  value={job}
                  onChange={(event) => setJob(event.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddNew;
