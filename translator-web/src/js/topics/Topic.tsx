import React, { useState } from "react"
import { Card, CardContent, Typography } from "@mui/material";

export const Topic = ({topic, expanded = false}) => {
  const [ expanded0, setExpanded0 ] = useState(expanded);
  const subtopics = topic.subtopics || [];

  const articles = topic.articles || []; // TODO: fetch articles;
  return <React.Fragment>
    <Typography onClick={ () => setExpanded0(!expanded0) }>{ topic.name }</Typography>

    <hr/>

    { expanded0 &&
    <React.Fragment>
        <Typography>Subtopics</Typography>
      { subtopics.map(subtopic =>
        <Card>
          <CardContent>
            <Typography>{ subtopic.name }</Typography>
            <Topic topic={ subtopic }/>
          </CardContent>
        </Card>)
      }

        <Card>
            <CardContent>
                <Typography> Articles </Typography>
              { articles.map(article => <Typography>{ article.title } - { article.link }</Typography>) }
            </CardContent>
        </Card>
    </React.Fragment>
    }
  </React.Fragment>
}
