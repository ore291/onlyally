import React, { useState, useEffect } from "react";
import { Form, Button, Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchReportReasonStart,
//   saveReportPostStart,
// } from "../../store/actions/PostAction";
import {
  fetchReportReasonStart,
  saveReportPostStart,
} from "../../store/slices/postSlice";
const ReportModeModal = (props) => {
  const dispatch = useDispatch();
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    if (props.reportMode === true) {
      dispatch(fetchReportReasonStart());
    }
  }, [props.reportMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      saveReportPostStart({
        post_id: props.post.post_id,
        report_reason_id: reportReason,
      })
    );
    console.log(props.post.post_id);
    props.closeReportModeModal();
  };
  const reportReasons = useSelector((state) => state.post.reportReason);
  const saveReportPost = useSelector((state) => state.post.saveReportPost);
  return (
    <>
      <Modal
        style={{ boxShadow: "0 3px 6px rgb(0 0 0 / 16%)" }}
        className="fixed top-[50%]  left-[30%] mt-[-50px] ml-[-100px] flex flex-col bg-white h-fit w-[40%]  pointer-events-auto rounded-[15px] !border-0 "
        size="md"
        centered
        show={props.reportMode}
        onHide={props.closeReportModeModal}
      >
        {props.reportMode === true ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="text-white text-center  bg-red-700 w-[40vw] rounded-t-[15px] inline-block">
                Report Post
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="report-form">
                <Form>
                  {reportReasons.loading
                    ? "loading"
                    : reportReasons.inputData.data.report_reason.length > 0
                    ? reportReasons.inputData.data.report_reason.map(
                        (report_content) => (
                          <Form.Group className="ml-4 p-[3px] text-bold">
                            <Form.Check
                              className=""
                              type="radio"
                              id={report_content.report_reason_id}
                              value={report_content.report_reason_id}
                              label={report_content.title}
                              name="report_content"
                              custom
                              onClick={() =>
                                setReportReason(report_content.report_reason_id)
                              }
                            />
                          </Form.Group>
                        )
                      )
                    : null}
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-between">
              <Button
                type="button"
                className="mb-2 ml-4"
                onClick={props.closeReportModeModal}
              >
                cancel
              </Button>
              <Button
                type="button"
                className="mb-2 "
                onClick={handleSubmit}
                disabled={reportReason.buttonDisable}
              >
                {saveReportPost.loadingButtonContent !== null
                  ? saveReportPost.loadingButtonContent
                  : "report"}
              </Button>
            </Modal.Footer>
          </>
        ) : null}
      </Modal>
    </>
  );
};

export default ReportModeModal;
