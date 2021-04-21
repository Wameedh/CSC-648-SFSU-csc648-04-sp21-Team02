import React, { useState } from "react";
import {
  Tabs,
  Tab,
  AppBar,
  Card,
  Typography,
  Grid,
  StylesProvider,
} from "@material-ui/core";
import "./ExploreUsers.css";

const ExploreUsers = (props) => {
  const [exploreList, setExploreList] = useState([
    {
      pet_id: 1,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju",
      size_name: "large",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi",
      size_name: "medium",
      age_name: "six",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
    },
    {
      pet_id: 1,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju",
      size_name: "large",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi",
      size_name: "medium",
      age_name: "six",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
    },
  ]);

  const EuCard = ({ title, src, exploreusersthingyintheplace }) => {
    return (
      <Card
        className="eu-card"
        key={`${exploreusersthingyintheplace}_Card_Item`}
      >
        <div style={{ display: "flex", width: "100%", padding: "14px" }}>
          <div style={{ marginRight: "10px" }}>
            <img src={src} className="eu-card-img" />
          </div>
          <div>
            <div>{title}</div>
          </div>
        </div>
      </Card>
    );
  };

  const Panel = (props) => (
    <div>
      <Typography>{props.children}</Typography>
    </div>
  );

  const [selectedTab, setSelectedTab] = useState(0);

  const onTabClicked = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="tabContainer" style={{ borderColor: "transparent" }}>
      <AppBar
        position="relative"
        elevation={0}
        style={{
          backgroundColor: "transparent",
          color: "black",
          width: "1000px",
          margin: "auto",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={onTabClicked}
          TabIndicatorProps={{ style: { background: "#00cc99" } }}
        >
          <Tab label="Results" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <div className="cardColumnContainer">
          {" "}
          {exploreList.map((item, index) => (
            <div
              style={{
                padding: " 10px 0px",
              }}
            >
              <EuCard
                title={item.name}
                src={item.profile_pic}
                exploreusersthingyintheplace={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreUsers;