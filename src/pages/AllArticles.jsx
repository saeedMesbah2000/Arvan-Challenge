import { NavLink, useLocation } from "react-router-dom";
import PopUp from "../share-component/PopUp";
import { useEffect, useState } from "react";
import getAllArticlesApi from "../service/getAllArticlesService";
import Loading from "../share-component/Loading";
import calculateFirstWords from "../helperFunctions/giveFirstAoumntWords";
import deleteArticleApi from "../service/deleteArticleService";
import Notification from "../share-component/Notification";
import styles from "./AllArticles.module.css";
import { useMessage } from "../hooks";

const AllArticles = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const [selectedArticleSlugToDelete, setSelectedArticleSlugToDelete] =
    useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { showMessage, toastMessages, setToastMessages } = useMessage();

  useEffect(() => {
    getAllArticlesApi(user).then((response) => {
      setIsLoading(false);
      setRows(response.articles);
    });
  }, []);

  const deleteArticle = () => {
    try {
      // deleteArticleApi(selectedArticleSlugToDelete, user.token);

      setRows((preState) => {
        const temp = [...preState];
        return temp.filter(
          (article, index) => article.slug !== selectedArticleSlugToDelete
        );
      });
      showMessage("Article deleted successfuly");
    } catch (error) {
      showMessage(error.message, true);
    }
  };

  return (
    <div className={styles.allArticles_container}>
      <p className={styles.allArticles_header}>All Posts</p>

      <PopUp onClickFunction={deleteArticle} />

      <Notification
        hasError={false}
        listOfMessages={toastMessages}
        setListOfMessages={setToastMessages}
      />
      <table className="table table-sm">
        <thead>
          <tr>
            <th className={styles.allArticles_table_header} scope="col">
              #
            </th>
            <th className={styles.allArticles_table_header} scope="col">
              Title
            </th>
            <th className={styles.allArticles_table_header} scope="col">
              Author
            </th>
            <th className={styles.allArticles_table_header} scope="col">
              Tags
            </th>
            <th className={styles.allArticles_table_header} scope="col">
              Expert
            </th>
            <th className={styles.allArticles_table_header} scope="col">
              Created
            </th>
          </tr>
        </thead>

        {!isLoading && (
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  <th
                    scope="row"
                    className={styles.allArticles_table_first_cell}
                  >
                    {index + 1}
                  </th>

                  <td className={styles.allArticles_table_title_expert_cell}>
                    {calculateFirstWords(10, row.title)}
                  </td>

                  <td className={styles.allArticles_table_cell}>
                    {row.author.username}
                  </td>

                  <td className={styles.allArticles_table_cell}>
                    {row.tagList.toString().replace(",", " ")}
                  </td>

                  <td className={styles.allArticles_table_title_expert_cell}>
                    {calculateFirstWords(20, row.body)}
                  </td>

                  <td>
                    <div
                      className={styles.allArticles_table_action_cell_container}
                    >
                      <p>{row.createdAt.slice(0, 10)}</p>

                      <div className="dropdown show">
                        <button
                          className={`btn btn-sm dropdown-toggle ${styles.allArticles_table_action_cell_dropDown_container}`}
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          ...
                        </button>

                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <NavLink
                            className={`dropdown-item ${styles.allArticles_table_action_cell_dropDown_item}`}
                            to={`/articles/edit/${row.slug}`}
                            state={user}
                          >
                            Edit
                          </NavLink>

                          <button
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => {
                              setSelectedArticleSlugToDelete(row.slug);
                            }}
                          >
                            Delete
                          </button>

                          <PopUp
                            message={"delete article"}
                            onClickFunction={deleteArticle}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>

      {isLoading && (
        <div className={styles.allArticles_loading}>
          <Loading />
        </div>
      )}

      <div className={styles.allArticles_pageInation}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                {"<"}
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#">
                {">"}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllArticles;
