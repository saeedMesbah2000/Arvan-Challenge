import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import getAllTagsApi from "../service/getAllTagsService";
import Loading from "../share-component/Loading";
import createArticlesApi from "../service/createArticleService";

const CreateArticle = () => {
  const temp = useParams();
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const [tags, setTags] = useState();
  const [isLoading, setIsLoading] = useState({
    tags: true,
    submitButton: true,
  });
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    body: "",
  });

  useEffect(() => {
    getAllTagsApi(user).then((response) => {
      setTags(response.tags);
      setIsLoading((preState) => {
        return { ...preState, tags: false };
      });
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newArticle.title.length === 0) {
      setErrors({ ...errors, title: "Title must not be empty" });
      setIsLoading({ ...isLoading, submitButton: true });
      return;
    }

    setErrors({ ...errors, title: "" });

    if (newArticle.description.length === 0) {
      setErrors({ ...errors, description: "Description must not be empty" });
      setIsLoading({ ...isLoading, submitButton: true });
      return;
    }

    setErrors({ ...errors, description: "" });

    if (newArticle.body.length === 0) {
      setErrors({ ...errors, body: "Body must not be empty" });
      setIsLoading({ ...isLoading, submitButton: true });
      return;
    }

    setErrors({ ...errors, body: "" });

    createArticlesApi(user, newArticle).then((response) => {
      console.log(response);
    });
    setIsLoading({ ...isLoading, submitButton: true });
  };

  return (
    <div className="w-100" style={{ padding: "10px 24px" }}>
      <p className="m-0" style={{ fontSize: "40px" }}>
        {temp.slug ? "Edit Article" : "Create Article"}
      </p>

      <div className="w-100 d-flex flex-row">
        <div className="w-100 mr-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ position: "relative" }}>
              <label for="exampleInputEmail1">Title</label>

              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Title"
                onChange={(event) => {
                  setNewArticle((preState) => {
                    return { ...preState, title: event.target.value };
                  });
                }}
              />

              {errors.title && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-22px",
                    left: "5px",
                    color: "#cb2e25",
                  }}
                >
                  {errors.title}
                </div>
              )}
            </div>

            <div className="form-group" style={{ position: "relative" }}>
              <label for="exampleInputPassword1">Description</label>

              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Description"
                onChange={(event) => {
                  setNewArticle((preState) => {
                    return { ...preState, description: event.target.value };
                  });
                }}
              />

              {errors.description && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-22px",
                    left: "5px",
                    color: "#cb2e25",
                  }}
                >
                  {errors.description}
                </div>
              )}
            </div>

            <div className="form-group" style={{ position: "relative" }}>
              <label for="exampleFormControlTextarea1">Body</label>

              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="8"
                onChange={(event) => {
                  setNewArticle((preState) => {
                    return { ...preState, body: event.target.value };
                  });
                }}
              />

              {errors.body && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-22px",
                    left: "5px",
                    color: "#cb2e25",
                  }}
                >
                  {errors.body}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary px-4"
              onClick={() => {
                setIsLoading({ ...isLoading, submitButton: false });
              }}
            >
              {isLoading.submitButton ? (
                "Submit"
              ) : (
                <div className="px-2">
                  <Loading size={"sm"} />
                </div>
              )}
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
            {isLoading.tags ? (
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

export default CreateArticle;
