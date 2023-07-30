export const articles = (state) => state.articles.articles;
export const articlesCount = (state) => state.articles.articlesCount;
export const articleRequestStatus = (state) => state.articles.articleRequestStatus;
export const errorArticleServer = (state) => state.articles.errorArticleServer;
export const singlePage = (state) => state.articles.singlePage;

export const offset = (state) => state.user.offset;
export const userName = (state) => state.user.username;
export const auth = (state) => state.user.email;
export const userAvatar = (state) => state.user.image;
export const userLoggedIn = (state) => state.user.username;
export const user = (state) => state.user;
export const userRequestStatus = (state) => state.user.userRequestStatus;
export const errorUserServer = (state) => state.user.errorUserServer;
export const userIsEdit = (state) => state.user.userIsEdit;
