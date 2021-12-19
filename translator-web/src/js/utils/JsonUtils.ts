export const JsonUtils = {
    tryReturnJson: (res) => {
        if (!res.ok) {
            return res.text().then(text => {
                throw new Error(text)
            });
        }
        return res.json()
    }
}
