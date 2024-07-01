const PopUp = ({ onClickFunction }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Delete Article
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure to delete Article ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn border px-4"
              data-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={onClickFunction}
              data-dismiss="modal"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
