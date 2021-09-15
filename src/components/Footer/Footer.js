/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { Link, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import './Footer.styles.scss';

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";
import { useHistory } from "react-router";


const useStyles = makeStyles(styles);

export default function Footer(props) {

  const history = useHistory();

  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <h5 className={classes.block}>CONTACTO:</h5>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link
                to="/"
                className={classes.block + " email"}
                component="a">
                jobinterviewme@gmail.com
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <p className={classes.block + " email"}>+34 619 86 29 79</p>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href='/buzon'
                className={classes.block}
                target="_self"
              >
                Buzón de sugerencias
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href=""
                className={classes.block}
                target="_blank"
              >
                Términos de uso

              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href=""
                className={classes.block}
                target="_blank"
              >
                Política de privacidad

              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href=""
                className={classes.block}
                target="_blank"
              > Política de cookies </a>
            </ListItem>
          </List>
        </div>



        <div className={classes.right}>

        </div>

      </div>
    </footer >
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
