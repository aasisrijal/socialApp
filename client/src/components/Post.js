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
    margin: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
});

const Post = ({ post: { title, body, createdAt, postedBy } }) => {
  const classes = styles();
  // console.log(props);
  const { _id, handle } = postedBy;

  return (
    <Card className={classes.card}>
      <CardMedia
        title="Profile image"
        image="/pp.png"
        className={classes.image}
      />
      {/* <img src="/pp.png" alt="image" /> */}
      <CardContent className={classes.content}>
        <Typography variant="h5">
          <Link to={`/user/${_id}`}>{handle}</Link>
        </Typography>

        <Typography variant="h4">{title}</Typography>

        <Typography variant="h6">
          {new Date(createdAt).toDateString()}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
