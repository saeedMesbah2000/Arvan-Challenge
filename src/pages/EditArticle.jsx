import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import getAllTagsApi from "../service/getAllTagsService";
import Loading from "../share-component/Loading";
import { UserContext } from "../App";

const EditArticle = () => {
  const user = useContext(UserContext);
  const temp = useParams();
  const location = useLocation();
  const [editedRow, setEditedRow] = useState(location.state);
  debugger;
  const [tags, setTags] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  useEffect(() => {
    getAllTagsApi(user).then((response) => {
      setTags(response.tags);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-100" style={{ padding: "10px 24px" }}>
      <p className="m-0" style={{ fontSize: "40px" }}>
        {temp.slug ? "Edit Article" : "Create Article"}
      </p>

      <div className="w-100 d-flex flex-row">
        <div className="w-100 mr-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Title</label>

              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Title"
              />
            </div>

            <div className="form-group">
              <label for="exampleInputPassword1">Description</label>

              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Description"
              />
            </div>

            <div className="form-group">
              <label for="exampleFormControlTextarea1">Body</label>

              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="8"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <div className="" style={{ width: "250px" }}>
          <div className="form-group">
            <label for="exampleInputEmail1">Tags</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="New Tag"
            />
          </div>

          <div className="border rounded px-2 py-4">
            {isLoading ? (
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading />
              </div>
            ) : (
              <>
                {" "}
                {tags.map((tag, index) => {
                  return (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={tag}
                        id="defaultCheck1"
                        onChange={(event) => {
                          console.log(event.target.value);
                        }}
                      />
                      <label className="form-check-label" for="defaultCheck1">
                        {tag}
                      </label>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
