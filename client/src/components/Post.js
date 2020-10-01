import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";

const styles = makeStyles({
  card: {
    display: "flex",
  },
});

const Post = ({ post: { title, body, createdAt, postedBy } }) => {
  const classes = styles();
  // console.log(props);
  const { _id, handle } = postedBy;

  return (
    <Card>
      <CardMedia title="Profile image" />
      <CardContent>
        <Typography variant="h5">
          <Link to={`/user/${_id}`}>{handle}</Link>
        </Typography>

        <Typography variant="h4">{title}</Typography>

        <Typography variant="h7">
          {new Date(createdAt).toDateString()}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
