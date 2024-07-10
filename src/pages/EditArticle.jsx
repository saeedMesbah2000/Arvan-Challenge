import React, { useContext, useEffect, useState } from "react";
import getAllTagsApi from "../service/getAllTagsService";
import Loading from "../share-component/Loading";
import editArticlesApi from "../service/editArticleService";
import { useInput } from "../hooks";
import { UserContext } from "../App";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./EditArticle.module.css";

const titleValidation = (value) => {
  return value.trim() !== "";
};

const descriptionValidation = (value) => {
  return value.trim() !== "";
};

const bodyValidation = (value) => {
  return value.trim() !== "";
};

const EditArticle = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const location = useLocation();
  const [editedRow, setEditedRow] = useState(location.state);
  const { slug } = useParams();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(editedRow.tagList);
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
  } = useInput(titleValidation, editedRow.title);

  const {
    value: descriptionValue,
    inputIsValid: descriptionIsValid,
    hasError: descriptionError,
    onBlurHandler: descriptionOnBlurHandler,
    onChangeHandler: descriptionOnChangeHandler,
    onResetHandler: descriptionOnResetHandler,
  } = useInput(descriptionValidation, editedRow.description);

  const {
    value: bodyValue,
    inputIsValid: bodyIsValid,
    hasError: bodyError,
    onBlurHandler: bodyOnBlurHandler,
    onChangeHandler: bodyOnChangeHandler,
    onResetHandler: bodyOnResetHandler,
  } = useInput(bodyValidation, editedRow.body);

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
        const newState = [...preState];
        newState.push(event.target.value);

        return newState;
      });
    } else {
      setSelectedTags((preState) => {
        const newState = [...preState];

        return newState.filter((item) => item !== event.target.value);
      });
    }
  };

  const newTagOnChangeHandler = (event) => {
    if (event.key === "Enter") {
      setTags((preState) => {
        const newState = [...preState];

        newState.push(event.target.value);
        return newState;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEditedRow = {
      article: {
        title: titleValue,
        description: descriptionValue,
        body: bodyValue,
        tagList: selectedTags,
      },
    };

    const response = await editArticlesApi(user, slug, newEditedRow);

    if (response.status) {
      navigate("/articles");
    } else {
      for (const key in response.data) {
        showMessage(key + " " + response.data[key]);
      }
    }
    setIsLoading({ ...isLoading, submitButton: true });
  };

  return (
    <div className={styles.editArticle_container}>
      <p className={styles.editArticle_header}>Create Article</p>

      <div className={styles.editArticle_form_container}>
        <div className={styles.editArticle_form_all_inputs_container}>
          <form onSubmit={handleSubmit}>
            <div
              className={`form-group ${styles.editArticle_form_input_container}`}
            >
              <label for="exampleInputEmail1">Title</label>

              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Title"
                value={titleValue}
                onChange={titleOnChangeHandler}
                onBlur={titleOnBlurHandler}
              />

              {titleError && (
                <div className={styles.editArticle_form_input_error}>
                  Title should not be empty
                </div>
              )}
            </div>

            <div
              className={`form-group ${styles.editArticle_form_input_container}`}
            >
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
                <div className={styles.editArticle_form_input_error}>
                  Description is not valid
                </div>
              )}
            </div>

            <div
              className={`form-group ${styles.editArticle_form_input_container}`}
            >
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
                <div className={styles.editArticle_form_input_error}>
                  Body should not be empty
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`btn ${styles.editArticle_form_input_submit_button}`}
              disabled={!formIsValid}
              onClick={() => {
                setIsLoading({ ...isLoading, submitButton: false });
              }}
            >
              {isLoading.submitButton ? (
                "Submit"
              ) : (
                <div
                  className={
                    styles.editArticle_form_input_submit_button_loading
                  }
                >
                  <Loading size={"sm"} />
                </div>
              )}
            </button>
          </form>
        </div>

        <div className={styles.editArticle_form_tags_container}>
          <div className="form-group">
            <label for="exampleInputEmail1">Tags</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="New Tag"
              onKeyDown={newTagOnChangeHandler}
            />
          </div>

          <div className="border rounded px-2 py-4">
            {isLoading.tags ? (
              <div className={styles.editArticle_form_tags_loading}>
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
                        defaultChecked={selectedTags.includes(tag)}
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
