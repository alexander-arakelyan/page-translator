import React, { Component, useEffect, useState } from "react";
import { ArticlesGrid } from "./ArticlesGrid";
import { ArticleSearch } from "./ArticleSearch";
import { ArticleModalConnected } from "./ArticleModal";
import { connect } from "react-redux";
import { ArticlesActions } from "./ArticlesReduces";

const ArticlesPage = ({
                        articles, rows, article, totalPages, onArticlesList, currentPage, pageSize,
                        onArticleSave,
                        onArticleAdd,
                        onArticleEdit,
                        onArticleRemove
                      }) => {
  const [ mounted, setMounted ] = useState(false);
  const [ article0, setArticle0 ] = useState({title: undefined});
  const [ articleTitle, setArticleTitle ] = useState("",);
  const [ showArticle, setShowArticle ] = useState(false);

  if (!mounted) {
    onArticlesList("");
    setMounted(true);
  }


  useEffect(() => {
    setArticle0(article);
  }, [ article ])

  const list = (article = undefined) => {
    if (article) {
      setArticle0(article);
    }
    onArticlesList(articleTitle, currentPage, pageSize)
  }

  const showEdit = () => {
    setShowArticle(true);
  }

  const hideEdit = () => {
    setShowArticle(false)
  }

  const updateSearch = (article) => {
    if (!article) {
      return;
    }
    setArticleTitle(article0.title);
  }

  const pageSize0 = pageSize;
  const pages = [];
  for (let number = 1; number <= totalPages; number++) {
    pages.push({number, active: number === 1 + currentPage});
  }
  const rows0 = rows || [];
  return (
    <React.Fragment>
      <ArticleSearch
        articleTitle={ articleTitle }
        onSearch={ (articleTitle) => {
          setArticleTitle(articleTitle);
          onArticlesList(articleTitle, currentPage, pageSize)
        } }
        onAdd={ (articleTitle) => {
          setArticle0({title: articleTitle});
          setShowArticle(true);
        } }
      />
      <ArticleModalConnected
        show={ showArticle }
        article={ article }
        onClose={ (article) => {
          updateSearch(article);
          hideEdit();
          list(article);
        } }
        onSave={ (article) => {
          if (article.id) {
            onArticleSave(article)
            .then((article) => {
              updateSearch(article);
              showEdit();
              list(article);
            });
          } else {
            onArticleAdd(article)
            .then((article) => {
              updateSearch(article);
              showEdit();
              list(article);
            });
          }
        } }
        onRemove={ (id) => {
          list();
        } }
      />
      <ArticlesGrid
        title={ articleTitle }
        rows={ articles }
        pageSize={ pageSize }
        totalPages={ totalPages }
        currentPage={ currentPage }
        pageClicked={ (page, pageSize) => {
          onArticlesList(articleTitle, page, pageSize)
        } }
        editClicked={ (id) => {
          onArticleEdit(id)
          .then(article => {
            setArticle0(article);
            setShowArticle(true);
          });
        } }
        removeClicked={ (id) => {
          onArticleRemove(id)
          .then(() => {
            list();
          });
        } }
      />
    </React.Fragment>
  )
}

export const ArticlesPageConnected = connect((state, props) => {
  const articlesReducer = state.articlesReducer;
  return {
    article: articlesReducer.article,
    articles: articlesReducer.pager?.content,
    pageSize: articlesReducer.pager?.size,
    currentPage: articlesReducer.pager?.number,
    totalPages: articlesReducer.pager?.totalPages
  }
}, (dispatch) => {
  return {
    onArticlesList: (title, page = 0, pageSize = 5) => {
      return ArticlesActions
      .list(title, page, pageSize, dispatch);
    },
    onArticleAdd: (article) => {
      return ArticlesActions
      .add(article, dispatch);
    },
    onArticleEdit: (id) => {
      return ArticlesActions
      .loadById(id, dispatch);
    },
    onArticleSave: (article) => {
      return ArticlesActions
      .save(article, dispatch);
    },
    onArticleRemove: (id, onEdit) => {
      return ArticlesActions
      .remove(id, dispatch);
    }
  }
})(ArticlesPage);
