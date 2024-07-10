import React, { useContext, useEffect, useState } from "react";
import getAllTagsApi from "../service/getAllTagsService";
import Loading from "../share-component/Loading";
import createArticlesApi from "../service/createArticleService";
import { useInput } from "../hooks";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const titleValidation = (value) => {
  return value.trim() !== "";
};

const descriptionValidation = (value) => {
  return value.trim() !== "";
};

const bodyValidation = (value) => {
  return value.trim() !== "";
};

const CreateArticle = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState({
    tags: true,
    submitButton: true,
  });

  const {
    value: titleValue,
    inputIsValid: titleIsValid,
    hasError: titleError,
    onBlurHandler: titleOnBlurHandler,
    onChangeHandler: titleOnChangeHandler,
    onResetHandler: titleOnResetHandler,
  } = useInput(titleValidation);

  const {
    value: descriptionValue,
    inputIsValid: descriptionIsValid,
    hasError: descriptionError,
    onBlurHandler: descriptionOnBlurHandler,
    onChangeHandler: descriptionOnChangeHandler,
    onResetHandler: descriptionOnResetHandler,
  } = useInput(descriptionValidation);

  const {
    value: bodyValue,
    inputIsValid: bodyIsValid,
    hasError: bodyError,
    onBlurHandler: bodyOnBlurHandler,
    onChangeHandler: bodyOnChangeHandler,
    onResetHandler: bodyOnResetHandler,
  } = useInput(bodyValidation);

  useEffect(() => {
    getAllTagsApi(user).then((response) => {
      setTags(response.tags);
      setIsLoading((preState) => {
        return { ...preState, tags: false };
      });
    });
  }, []);

  const formIsValid = titleIsValid && descriptionIsValid && bodyIsValid;

  const tagsOnSelectHandler = (event) => {
    if (event.target.checked) {
      setSelectedTags((preState) => {
        const temp = [...preState];
        temp.push(event.target.value);

        return temp;
      });
    } else {
      setSelectedTags((preState) => {
        const temp = [...preState];

        return temp.filter((item) => item !== event.target.value);
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newArticle = {
      article: {
        title: titleValue,
        description: descriptionValue,
        body: bodyValue,
        tagList: selectedTags,
      },
    };

    const response = await createArticlesApi(user, newArticle);

    if (response.status) {
      debugger;
      navigate("/articles");
    } else {
      for (const key in response.data) {
        showMessage(key + " " + response.data[key]);
      }
    }
    setIsLoading({ ...isLoading, submitButton: true });
  };

  return (
    <div className="w-100" style={{ padding: "10px 24px" }}>
      <p className="m-0" style={{ fontSize: "40px" }}>
        Create Article
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
                value={titleValue}
                onChange={titleOnChangeHandler}
                onBlur={titleOnBlurHandler}
              />

              {titleError && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-22px",
                    left: "5px",
                    color: "#cb2e25",
                  }}
                >
                  Title shoud not be empty
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
                value={descriptionValue}
                onChange={descriptionOnChangeHandler}
                onBlur={descriptionOnBlurHandler}
              />

              {descriptionError && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-22px",
                    left: "5px",
                    color: "#cb2e25",
                  }}
                >
                  Description is not valid
                </div>
              )}
            </div>

            <div className="form-group" style={{ position: "relative" }}>
              <label for="exampleFormControlTextarea1">Body</label>

              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="8"
                value={bodyValue}
                onChange={bodyOnChangeHandler}
                onBlur={bodyOnBlurHandler}
              />

              {bodyError && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-22px",
                    left: "5px",
                    color: "#cb2e25",
                  }}
                >
                  Body should not be empty
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={!formIsValid}
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
              type="text"
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
                {tags.map((tag, index) => {
                  return (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={tag}
                        id="defaultCheck1"
                        onChange={tagsOnSelectHandler}
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
