// @ts-check
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, GridItem, Spacer, Stack } from "@chakra-ui/react";

import { getActiveClients } from "../reducers/clients";
import { getInvoices } from "../reducers/invoices";
import { getUninvoicedItems } from "../reducers/items";

import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ClientSelector } from "./clients/ClientSelector";

export function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveClients());
    dispatch(getInvoices());
    dispatch(getUninvoicedItems());
  }, []);

  return (
    <>
      <Header />
      <Stack mt={3} marginX={3} gap={3} direction={"column"}>
        <ClientSelector />
        <Content />
        <Footer />
      </Stack>
    </>
  );
}
