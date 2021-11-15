import React from "react";
import {Button, Card, Table} from "react-bootstrap";

export const ArticleWordsGrid = ({words, articleWords, onAdd, onRemove, props}) => {
    return (<React.Fragment>
        <Table>
            <tr>
                <td>
                    <Card>
                        <Card.Title>Found</Card.Title>
                        <Card.Body>
                            <Table>
                                <tr>
                                    <th>Word</th>
                                    <th>Language</th>
                                    <th></th>
                                </tr>
                                {words?.map((word, key) => {
                                    return (<tr key={key}>
                                        <td>{word.name}</td>
                                        <td>{word.langName}</td>
                                        <td>
                                            {<Button onClick={() => onAdd(word)}>Add</Button>}
                                        </td>
                                    </tr>);
                                })}
                            </Table>
                        </Card.Body>
                    </Card>
                </td>
                <td></td>
                <td>
                    <Card>
                        <Card.Title>Mentioned</Card.Title>
                        <Card.Body>

                            <Table>
                                <tr>
                                    <th>Word</th>
                                    <th>Count</th>
                                    <th>Language</th>
                                    <th></th>
                                </tr>

                                {articleWords?.map((articleWord, key) => {
                                    return (<tr key={key}>
                                        <td>{articleWord.wordName}</td>
                                        <td>{articleWord.count}</td>
                                        <td>{articleWord.langName}</td>
                                        <td>
                                            <Button onClick={() => onRemove(articleWord)}>-</Button>
                                            <Button onClick={() => onAdd({
                                                id: articleWord.wordId,
                                                name: articleWord.wordName,
                                                langCode: articleWord.langCode
                                            })}>+</Button>
                                        </td>
                                    </tr>);
                                })}
                            </Table>
                        </Card.Body>
                    </Card>
                </td>
            </tr>
        </Table>
    </React.Fragment>)
}
