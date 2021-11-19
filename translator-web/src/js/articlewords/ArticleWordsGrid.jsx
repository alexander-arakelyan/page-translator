import React from "react";
import {Button, Card, CardContent, CardHeader, Table, TableCell, TableHead, TableRow} from "@mui/material";

export const ArticleWordsGrid = ({words, articleWords, onAdd, onRemove, props}) => {
    return (<React.Fragment>
        <Table>
            <TableRow style={{verticalAlign: "top"}}>
                <TableCell>
                    <Card>
                        <CardHeader>Found</CardHeader>
                        <CardContent>
                            <Table size="small">
                                <TableHead>
                                    <TableCell>Word</TableCell>
                                    <TableCell>Language</TableCell>
                                    <TableCell></TableCell>
                                </TableHead>

                                {words?.map((word, key) => {
                                    return (<TableRow key={key}>
                                        <TableCell>{word.name}</TableCell>
                                        <TableCell>{word.langName}</TableCell>
                                        <TableCell>
                                            {<Button onClick={() => onAdd(word)}>Add</Button>}
                                        </TableCell>
                                    </TableRow>);
                                })}

                            </Table>
                        </CardContent>
                    </Card>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <Card>
                        <CardHeader>Mentioned</CardHeader>
                        <CardContent>
                            <Table size="small">
                                <TableHead>
                                    <TableCell>Word</TableCell>
                                    <TableCell>Language</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Count</TableCell>
                                    <TableCell></TableCell>
                                </TableHead>

                                {articleWords?.map((articleWord, key) => {
                                    return (<TableRow key={key} style={{verticalAlign: "top"}}>
                                        <TableCell>{articleWord.wordName}</TableCell>
                                        <TableCell>{articleWord.langName}</TableCell>
                                        <TableCell>{
                                            <Table size="small">
                                                <TableHead>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Language</TableCell>
                                                </TableHead>
                                                {
                                                    articleWord.tags?.map((key, val) => {
                                                        return (<TableRow>
                                                            <TableCell>{key.name}</TableCell>
                                                            <TableCell>{key.langName}</TableCell>
                                                        </TableRow>);
                                                    })
                                                }
                                            </Table>
                                        }</TableCell>
                                        <TableCell>{articleWord.count}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => onRemove(articleWord)}>-</Button>
                                            <Button onClick={() => onAdd({
                                                id: articleWord.wordId,
                                                name: articleWord.wordName,
                                                langCode: articleWord.langCode
                                            })}>+</Button>
                                        </TableCell>
                                    </TableRow>);
                                })}

                            </Table>
                        </CardContent>
                    </Card>
                </TableCell>
            </TableRow>
        </Table>
    </React.Fragment>)
}
