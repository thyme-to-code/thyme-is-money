// @ts-check
import React from "react";
import { useSelector } from "react-redux";
import {
  Center,
  CircularProgress,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import { ClientDetails } from "./clients/ClientDetails";
import { NewInvoice } from "./invoices/NewInvoice";
import { NewTask } from "./tasks/NewTask";
import { Tasks } from "./tasks/Tasks";
import { UpdateClient } from "./clients/UpdateClient";
import { Overview } from "./Overview";
import { ClientInvoiceList } from "./invoices/ClientInvoiceList";

export function Content() {
  const { selected, loading } = useSelector((state) => state.clients);

  if (loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="teal.300" />
      </Center>
    );
  }

  return selected.id ? (
    <>
      <ClientDetails />
      <Divider m={3} />
      <Center>
        <NewTask />
        <NewInvoice />
        <Spacer />
        <ClientInvoiceList />
        <UpdateClient />
      </Center>
      <Divider m={3} />
      <Tasks />
    </>
  ) : (
    <Overview />
  );
}
