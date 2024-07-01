import { NavLink, useLocation } from "react-router-dom";
import PopUp from "../share-component/PopUp";
import { useEffect, useState } from "react";
import getAllArticlesApi from "../service/getAllArticlesService";
import Loading from "../share-component/Loading";
import calculateFirstWords from "../helperFunctions/giveFirstAoumntWords";
import deleteArticleApi from "../service/deleteArticleService";

const AllArticles = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const [selectedArticleSlugToDelete, setSelectedArticleSlugToDelete] =
    useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllArticlesApi(user).then((response) => {
      setIsLoading(false);
      setRows(response.articles);
    });
  }, []);

  const deleteArticle = () => {
    deleteArticleApi(selectedArticleSlugToDelete, user.token);

    setRows((preState) => {
      const temp = [...preState];
      return temp.filter(
        (article, index) => article.slug !== selectedArticleSlugToDelete
      );
    });
  };

  return (
    <div className="w-100" style={{ padding: "10px 24px" }}>
      <p className="m-0" style={{ fontSize: "40px" }}>
        All Posts
      </p>

      <PopUp onClickFunction={deleteArticle} />

      <table className="table table-sm">
        <thead>
          <tr style={{ backgroundColor: "red" }}>
            <th style={{ backgroundColor: "#eceeef" }} scope="col">
              #
            </th>
            <th style={{ backgroundColor: "#eceeef" }} scope="col">
              Title
            </th>
            <th style={{ backgroundColor: "#eceeef" }} scope="col">
              Author
            </th>
            <th style={{ backgroundColor: "#eceeef" }} scope="col">
              Tags
            </th>
            <th style={{ backgroundColor: "#eceeef" }} scope="col">
              Expert
            </th>
            <th style={{ backgroundColor: "#eceeef" }} scope="col">
              Created
            </th>
          </tr>
        </thead>

        {!isLoading && (
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  <th scope="row" style={{ paddingLeft: "10px" }}>
                    {index + 1}
                  </th>
                  <td style={{ padding: "5px", fontSize: "15px" }}>
                    {calculateFirstWords(10, row.title)}
                  </td>
                  <td style={{ padding: "5px" }}>{row.author.username}</td>
                  <td style={{ padding: "5px" }}>
                    {row.tagList.toString().replace(",", " ")}
                  </td>
                  <td style={{ padding: "5px", fontSize: "15px" }}>
                    {calculateFirstWords(20, row.body)}
                  </td>
                  <td>
                    <div
                      className="d-flex flex-row justify-content-between"
                      style={{ width: "130px" }}
                    >
                      <p className="">{row.createdAt.slice(0, 10)}</p>

                      <div className="dropdown show">
                        <button
                          className="btn btn-sm dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-expanded="false"
                          style={{ backgroundColor: "#5bc0de", color: "white" }}
                        >
                          ...
                        </button>

                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <NavLink
                            className="dropdown-item"
                            to={`/articles/edit/${row.slug}`}
                            state={user}
                            style={{ textDecoration: "none" }}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 230px)",
            width: "100vh",
          }}
        >
          <Loading />
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center">
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
