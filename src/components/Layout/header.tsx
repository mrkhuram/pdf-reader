import React, { useState,FC } from "react";
import { ExpandMoreRounded } from "@mui/icons-material";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContextCustom } from "../../store/context";
import Dropdown from "../dropdown";

const HeaderWrapper = styled(Paper)(({ expand }) => ({
  backgroundColor: "#FFFFFF",
  textAlign: "center",
  color: "#161616",
  width: "100%",
  height: "63px",
  borderRadius: 0,
  paddingLeft: expand ? 160 : 87,
  paddingRight: "2%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 2,
  boxShadow: "none",
}));

const TitleWrapper = styled(Box)((props) => ({
  color: "#161616",
  display: "flex",
  flexDirection: props.row ? "row" : "column",
  alignItems: props.flexStart ? "flex-start" : "center",
  justifyContent: props.spaceBetween
    ? "space-between"
    : props.flexend
    ? "flex-end"
    : "center",
  marginTop: props.marginTop ? "5px" : 0,
  borderBottom: props.active ? "2px solid #3D885B" : "2px solid transparent",
}));

let style = {
  title: {
    fontSize: 10,
    fontFamily: "'Poppins', sans-serif",
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "'Poppins', sans-serif",
  },
  headerDropDown: {
    fontSize: 16,
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    backgroundColor: "#3D885B",
    width: 16,
    height: "2px",
    borderRadius: 5,
  },
  transparent: {
    backgroundColor: "transparent",
    height: "2px",
  },
  iconStyle: {
    fontSize: 22,
    "&:hover": {
      color: "#2541B2",
    },
  },
  micIcon: {
    fontSize: 24,
    "&:hover": {
      color: "#2541B2",
    },
  },
  redDivider: {
    backgroundColor: "#FF0000",
  },
  greenDivider: {
    backgroundColor: "#3D885B",
  },
  orangeDivider: {
    backgroundColor: "#F4B51E",
  },
};

const Header: FC = () => {
  let expand = useContextCustom().state.expand;

  return (
    <HeaderWrapper expand={expand}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <TitleWrapper row spaceBetween marginTop>
            <TitleWrapper flexStart>
              <Typography component="p" style={style.subTitle}>
                Book Saver
              </Typography>

              <Divider sx={style.divider} />
            </TitleWrapper>
          </TitleWrapper>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <TitleWrapper row flexend marginTop>
            {/* <Typography component="p" style={style.headerDropDown}>
              Today <ExpandMoreRounded />
            </Typography> */}
            <Dropdown />
          </TitleWrapper>
        </Grid>
      </Grid>
    </HeaderWrapper>
  );
};

export default Header;
