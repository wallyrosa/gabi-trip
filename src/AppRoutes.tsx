import * as React from "react";
import { SearchPage } from "./pages/search";
import { Navigate, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";
import { TripPage } from "./pages/search/trip";

export function AppRoutes() {
  return (
    <React.Suspense fallback="asd">
      <Grid container spacing={2}>
        <Grid item xs={0.2}></Grid>
        <Grid item xs={11.6}>
          <Routes>
            <Route path="/home">
              <Route index element={<SearchPage />} />
              <Route path="trip">
                <Route index element={<TripPage />} />
                <Route path=":id" element={<TripPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to={"/home"} />} />
          </Routes>
        </Grid>
        <Grid item xs={0.2}></Grid>
      </Grid>
    </React.Suspense>
  );
}
