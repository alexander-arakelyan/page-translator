export const selectLangs = ((state) => {
  return state.langsReducer.pager?.content;
});
export type LangType = {
  code: string;
  name: string;
}

export class LangStorage {
  static readonly getDefault = (): LangType => {
    let item = localStorage.getItem("lang");
    return item ? JSON.parse(item) : {code: "en", name: "English"};
  }

  static readonly setDefault = (lang) => {
    localStorage.setItem("lang", JSON.stringify(lang));
  }
}
