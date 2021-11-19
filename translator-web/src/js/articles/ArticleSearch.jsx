import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, FormGroup, Grid, Input, InputLabel} from "@mui/material";

export const ArticleSearch = ({articleTitle, onSearch, onAdd}) => {
    const [titleInternal, setTitleInternalInternal] = useState("");

    useEffect(() => {
        if (titleInternal != articleTitle) {
            setTitleInternalInternal(articleTitle);
        }
    })

    return (<React.Fragment>
            <FormGroup>
                <Grid container spacing={5}>
                    <Grid item>
                        <FormGroup>
                            <InputLabel title={"Enter title"}/>
                            <Input value={titleInternal}
                                   onChange={(val) => {
                                       const nextVal = val.target.value;
                                       setTitleInternalInternal(nextVal);
                                       onSearch(nextVal);
                                   }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item>
                        <ButtonGroup>
                            <Button variant="primary" type="button" onClick={() => {
                                onSearch(titleInternal);
                            }}>Find</Button>
                            {titleInternal && <Button variant="secondary" onClick={event => {
                                onAdd(titleInternal);
                            }}>Add</Button>}
                            {titleInternal && <Button variant="secondary" onClick={event => {
                                setTitleInternalInternal("");
                                onSearch("")
                            }}>Clear</Button>}
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </FormGroup>
        </React.Fragment>
    )
};
