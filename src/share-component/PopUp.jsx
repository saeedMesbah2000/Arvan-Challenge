/*
this is componenet is for popUp functionality and it is implemented with bootstrap

input arguments: 

1- onClickFunction : it is a funcion that given to the "Yes" button if the action is been decided to happen

Note: the bootstrap will handle the close functionality in "No" button

*/

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
