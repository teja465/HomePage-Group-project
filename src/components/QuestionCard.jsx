import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import CreateIcon from "@material-ui/icons/Create";
import Link from "@material-ui/core/Link";
import config from "../config";
import Popover from "@material-ui/core/Popover";
import { formatDistance, subDays } from "date-fns";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PopoverPopupState from "./Popover";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// question in home page
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: "auto",
      marginBottom: "10px",
      //padding: "5px",
    },
    text: {
      fontWeight: "500",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      // color: "primary",
    },

    avatar: {
      backgroundColor: red[500],

      // color: "white",
    },
    mlauto: {
      marginLeft: "auto",
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export default function RecipeReviewCard({ question }) {
  let quest = question.question;
  let user_name = question.userName;
  let date = question.date;
  let date_on_profile = formatDistance(subDays(new Date(date), 0), new Date());

  //console.log(date,quest,user_name,question)
  let question_id = "2132";
  let url = config.url + "/write_answer/" + question.id;
  let answers_url = config.url + "/question_detail_page/" + question.id;
  console.log(question, "qn obj--------------");

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setvalue] = useState(
    config.url + "/question_detail_page/" + question.id
  );
  console.log(value, "value to be copied !!");
  const [isCopied, setisCopied] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [] = useState("teja46 user ");

  const [] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user_name[0]}
          </Avatar>
        }
        action={
          <>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <CopyToClipboard
                    text={value}
                    onCopy={() => {
                      setisCopied(true);
                      console.log("copied ");
                    }}
                  >
                    <IconButton aria-label="share" {...bindTrigger(popupState)}>
                      <ShareIcon />
                    </IconButton>
                  </CopyToClipboard>

                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Box p={1}>
                      <Typography>Copied</Typography>
                    </Box>
                  </Popover>
                </div>
              )}
            </PopupState>
          </>
        }
        title=  {<p style={{color:"blue",fontWeight:"600", responsiveFontSizes:"10px"}}>{user_name} </p>} 
        subheader={date_on_profile}
      />

      <CardContent>
        <Box fontWeight={600}   m={1}>
          
          {quest.length < 300 ? quest : quest.substring(0, 300)}
          {quest.length < 300 ? "" : <Link href="more ">...more</Link>}
        </Box>
       
      </CardContent>
      <CardActions disableSpacing>
        <div>
          <Link
            href={url}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onTouchMove={handlePopoverOpen}
          >
            <IconButton aria-label="add to favorites">
              <CreateIcon />
            </IconButton>
          </Link>

          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>Answer this question </Typography>
          </Popover>
        </div>

        <Link href={answers_url} className={classes.mlauto}>
          <Typography>Answers</Typography>
        </Link>
      </CardActions>
    </Card>
  );
}
