import React, { useEffect, useState } from "react";
import { ArticlesGrid } from "./ArticlesGrid";
import { ArticleSearch } from "./ArticleSearch";
import { ArticleModal } from "./ArticleModal";
import { ArticlesActions } from "./ArticlesReduces";
import {
  selectArticle,
  selectArticles,
  selectArticlesCurrentPage,
  selectArticlesPageSize,
  selectArticlesTotalPages
} from "./ArticleSelector";
import { useSelector, useDispatch } from "react-redux";

export const ArticlesPage = ({}) => {
  const dispatch = useDispatch();

  const article = useSelector(selectArticle);
  const articles = useSelector(selectArticles);
  const pageSize = useSelector(selectArticlesPageSize);
  const currentPage = useSelector(selectArticlesCurrentPage);
  const totalPages = useSelector(selectArticlesTotalPages)

  const onArticlesList = (title, page = 0, pageSize = 5) => {
    return ArticlesActions.list(title, page, pageSize, dispatch);
  }
    const onArticleAdd = (article) => {
    return ArticlesActions.add(article, dispatch);
  }
  const onArticleEdit = (id) => {
    return ArticlesActions.loadById(id, dispatch);
  }
    const onArticleSave = (article) => {
    return ArticlesActions.save(article, dispatch);
  }
  const onArticleRemove= (id) => {
    return ArticlesActions.remove(id, dispatch);
  }

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

  const pages = [];
  for (let number = 1; number <= totalPages; number++) {
    pages.push({number, active: number === 1 + currentPage});
  }
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
      <ArticleModal
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
