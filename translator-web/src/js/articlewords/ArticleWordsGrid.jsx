import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export const ArticleWordsGrid = ({words, articleWords, onAdd, onRemove, props}) => {
    return (<React.Fragment>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow style={{verticalAlign: "top"}}>
                            <TableCell>
                                <Card>
                                    <CardHeader>Found</CardHeader>
                                    <CardContent>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Word</TableCell>
                                                        <TableCell>Language</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {words?.map((word, key) => {
                                                        return (<TableRow key={key}>
                                                            <TableCell>{word.name}</TableCell>
                                                            <TableCell>{word.langName}</TableCell>
                                                            <TableCell>
                                                                {<Button onClick={() => onAdd(word)}>Add</Button>}
                                                            </TableCell>
                                                        </TableRow>);
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <Card>
                                    <CardHeader>Mentioned</CardHeader>
                                    <CardContent>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Word</TableCell>
                                                        <TableCell>Language</TableCell>
                                                        <TableCell>Tags</TableCell>
                                                        <TableCell>Count</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {articleWords?.map((articleWord, key) => {
                                                        return (<TableRow key={key} style={{verticalAlign: "top"}}>
                                                            <TableCell>{articleWord.wordName}</TableCell>
                                                            <TableCell>{articleWord.langName}</TableCell>
                                                            <TableCell>{
                                                                <Table size="small">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Name</TableCell>
                                                                            <TableCell>Language</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {
                                                                            articleWord.tags?.map((val, key) => {
                                                                                return (<TableRow
                                                                                    key={"articleWord_" + val.id}
                                                                                >
                                                                                    <TableCell>{val.name}</TableCell>
                                                                                    <TableCell>{val.langName}</TableCell>
                                                                                </TableRow>);
                                                                            })
                                                                        }
                                                                    </TableBody>
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
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </Card>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
