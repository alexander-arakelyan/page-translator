export const JsonUtils = {
  tryReturnJson: (res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return res.json();
  },

  downloadFile: (content: string, fileName: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "data:application/json;charset=utf-8," + content;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  },
};
