import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Cart({ cartCount }) {
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const addedItems = JSON.parse(localStorage.getItem("cart"));
  let totalAmount = 0;

  const removeItemFromCart = async (id) => {
    const remeaningItems = JSON.parse(localStorage.getItem("cart"))?.filter(
      (val: any) => val.id !== id
    );
    await localStorage.setItem("cart", JSON.stringify(remeaningItems));
    setOpenSuccessAlert(true);
    cartCount(remeaningItems?.length);
  };

  const handleClose = () => {
    setOpenSuccessAlert(false);
  };

  return (
    <>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Yeh...!! Item added successfully
        </Alert>
      </Snackbar>
      <Box sx={{ flexGrow: 1 }}>
        <div style={{ paddingBottom: 30 }} />
        <Grid container spacing={6}>
          <Grid item md={8}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {addedItems &&
                    addedItems?.map((data) => {
                      totalAmount += Number(data?.price);
                      return (
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={data?.img} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={data?.title}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  ${parseFloat(data?.price).toFixed(2)}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeItemFromCart(data?.id)}
                          >
                            Delete
                          </Button>
                        </ListItem>
                      );
                    })}
                  {(!addedItems || addedItems.length === 0) && "Cart is empty"}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <p> Item total: ${totalAmount}</p>
                <p> Tax: $0.00</p>
                <b> Todays total: ${parseFloat(totalAmount).toFixed(2)}</b>
                <br />
                <Button variant="contained" style={{ marginTop: 20 }}>
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
