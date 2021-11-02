import React, { useState, useEf } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getDefaultNormalizer } from "@testing-library/dom";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    flexDirection: "column",
    marginTop: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3e92c9",
  },
  textfield: {
    width: 300,
    marginTop: 20,
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [repoURL, setRepoURL] = useState("");
  const [hasErrors, setHasErrors] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [data, setData] = useState({});
  const isError = (condition) => hasErrors && condition;
  const myId = "393115";
  const myEmail = "zhiqingguo30@gmail.com";
  const myRepoURL = "https://github.com/GUO0430/plant-and-food-research.git";
  const mySecret = "m0e8l2";
  const registerURL = `https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates?email=${email}&secret=${secret}`;

  async function checkRegistration() {
    const response = await axios(registerURL, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
    });
    return response;
  }

  async function submitRepo() {
    const body = { repoURL: repoURL, secret: secret };
    const id = data.id;
    const response = await axios(
      `https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates/${id}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        data: body,
        method: "PATCH",
      }
    );
    return response;
  }

  async function sumbit() {
    setHasErrors(true);
    if (email.length > 0 && secret.length > 0) {
      try {
        const response = await checkRegistration();
        if (response.status === 200) {
          if (response.data.length === 0) {
            setShowErrorMessage(true);
          } else {
            console.log(response.data);
            setData(response.data);
            setRegistered(true);
            setHasErrors(false);
          }
          // console.log(response);
        }
        //console.log(response.data);
      } catch (e) {
        console.log(e.response);
      }
    }
  }

  async function handleSumbitRepo() {
    try {
      // setLoading(true);
      const response = await submitRepo();
      if (response.status === 200) {
        console.log(response);
      } else {
        alert("Oops! Something went wrong. Please try again");
      }
      //console.log(response.data);
    } catch (e) {
      console.log(e.response.data.error);
    }
  }

  return (
    <div className={classes.root}>
      {!registered ? (
        <div>
          <h2 style={{ maxWidth: "80vw" }}>
            Check if you are register with us by providing your detail
          </h2>
          <br />
          {showErrorMessage && (
            <Typography color="error">
              Sorry, we cannot find your record.
            </Typography>
          )}
          <TextField
            variant="outlined"
            label="Email"
            className={classes.textfield}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            error={isError(email.length === 0)}
            helperText={
              isError(email.length === 0) && "Please enter your email!"
            }
          />
          <br />
          <TextField
            variant="outlined"
            label="Secret"
            className={classes.textfield}
            onChange={(e) => setSecret(e.target.value.trim().toLowerCase())}
            error={isError(secret.length === 0)}
            helperText={
              isError(secret.length === 0) && "Please enter your secret!"
            }
          />
          <br />
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => sumbit()}
          >
            Check
          </Button>
        </div>
      ) : (
        <div>
          <h2 style={{ maxWidth: "80vw" }}>Please confirm your detail</h2>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {Object.keys(data).map((item) => {
              return (
                <Grid item xs={10} style={{ float: "left" }}>
                  <Typography style={{ marginTop: 10, float: "left" }}>
                    {item} : {data[item]}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          <TextField
            variant="outlined"
            label="repoURL"
            style={{ width: 400 }}
            className={classes.textfield}
            onChange={(e) => setSecret(e.target.value.trim().toLowerCase())}
            error={isError(secret.length === 0)}
            helperText={
              isError(secret.length === 0) && "Please enter your secret!"
            }
          />
          <br />
          <Button
            variant="contained"
            style={{ marginTop: 30, marginLeft: "auto", marginRight: "auto" }}
            className={classes.button}
            onClick={() => handleSumbitRepo()}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
