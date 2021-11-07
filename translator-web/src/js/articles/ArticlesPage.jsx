import React, {Component} from "react";
import {ArticlesGrid} from "./ArticlesGrid";
import {ArticleSearch} from "./ArticleSearch";
import ArticleModal from "./ArticleModal";
import {connect} from "react-redux";
import {ArticlesActions} from "./ArticlesReduces";

class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            articleTitle: "",
            showArticle: false
        }
    }

    componentDidMount() {
        this.props.onArticlesList("");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.article != prevProps.article) {
            this.setState({article: this.props.article});
        }
    }

    list(article = undefined) {
        if (article) {
            this.setState({article});
        }
        this.props.onArticlesList(
            this.state.articleTitle,
            this.props.currentPage,
            this.props.pageSize
        )
    }

    showEdit() {
        this.setState({showArticle: true});
    }

    hideEdit() {
        this.setState({showArticle: false})
    }

    updateSearch(article) {
        if (!article) {
            return;
        }
        this.setState({articleTitle: article.title})
    }

    render() {
        const pageSize = this.props.pageSize;
        const pages = [];
        for (let number = 1; number <= this.props?.totalPages; number++) {
            pages.push({number, active: number === 1 + this.props?.currentPage});
        }
        const rows = this.props.rows ? this.props?.rows : [];
        return (
            <React.Fragment>
                <ArticleSearch
                    articleTitle={this.state.articleTitle}
                    onSearch={(articleTitle) => {
                        this.setState({articleTitle});
                        this.props.onArticlesList(
                            articleTitle,
                            this.props.currentPage,
                            this.props.pageSize
                        )
                    }}
                    onAdd={(articleTitle) => {
                        this.setState({article: {title: articleTitle}, showArticle: true});
                    }}
                />
                <ArticleModal
                    show={this.state.showArticle}
                    article={this.state.article}
                    onClose={(article) => {
                        this.updateSearch(article);
                        this.hideEdit();
                        this.list(article);

                    }}
                    onSave={(article) => {
                        if (article.id) {
                            this.props
                                .onArticleSave(article)
                                .then((article) => {
                                    this.updateSearch(article);
                                    this.showEdit();
                                    this.list(article);
                                });
                        } else {
                            this.props
                                .onArticleAdd(article)
                                .then((article) => {
                                    this.updateSearch(article);
                                    this.showEdit();
                                    this.list(article);
                                });
                        }
                    }}
                    onRemove={(id) => {
                        this.list();
                    }}
                />
                <ArticlesGrid
                    title={this.state.articleTitle}
                    rows={this.props.articles}
                    pageSize={this.props.pageSize}
                    totalPages={this.props.totalPages}
                    currentPage={this.props.currentPage}
                    pageClicked={(page, pageSize) => {
                        this.props.onArticlesList(this.state.articleTitle, page, pageSize)
                    }}
                    editClicked={(id) => {
                        this.props
                            .onArticleEdit(id)
                            .then(article => {
                                this.setState({article, showArticle: true})
                            });
                    }}
                    removeClicked={(id) => {
                        this.props
                            .onArticleRemove(id)
                            .then(() => {
                                this.list();
                            });
                    }}
                />
            </React.Fragment>
        )
    }
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
