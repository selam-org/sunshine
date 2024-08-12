import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import senders, {
  getSendersLoading,
  isSendersDialogOpen,
  getSenders,
  setSenderIsDialog,
} from "../store/reducers/senders";
import SendersItem from "./SenderListItem";
const App = (props) => {
  const { isDisabled, onClick } = props;
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(isSendersDialogOpen);
  const senders = useSelector(getSenders);
  const loading = useSelector(getSendersLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(senders);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    dispatch(setSenderIsDialog({ open: false }));
  };
  return (
    <>
      <Button disabled={isDisabled} onClick={onClick} type="primary">
        Search{" "}
      </Button>
      <Modal
        title="Basic Modal"
        open={isDialogOpen}
        // onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          bodyStyle={{
            maxHeight: "70vh", // Set a fixed height for the modal content
            overflowY: 'scroll',
            scrollbarWidth: 'none', /* For Firefox */
            msOverflowStyle: 'none',  /* For Internet Explorer and Edge */          }}
      >
        <div
         style={{
            height: "60vh", // Ensure it takes the full height of the modal body
            width: "50vw",  // Ensure it takes the full width of the modal body
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <SendersItem />
              <SendersItem />

            </>
          )}
        </div>
      </Modal>
    </>
  );
};
export default App;
