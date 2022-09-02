// @ts-check
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heading, Select, FormLabel } from "@chakra-ui/react";
import { setSelectedClient, clearSelectedClient } from "../../reducers/clients";

export function ClientSelector() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  const orderedCompanyNames = clients.active
    .map((client) => client.business_name)
    .sort();

  function handleChange(e) {
    if (e.target.value) {
      const myClient = clients.active.find(
        (client) => client.business_name == e.target.value
      );
      return dispatch(setSelectedClient(myClient));
    } else {
      return dispatch(clearSelectedClient());
    }
  }

  if (clients.loading) {
    return <>Loading ...</>;
  }

  return (
    <Select
      onChange={handleChange}
      size="lg"
      placeholder="Select client"
      mb="3"
      borderColor="brand.100"
      bg="brand.100"
      color="brand.50"
      _hover={{ bg: "brand.200" }}
      style={{ fontSize: "1.4em", fontWeight: "600" }}
    >
      {orderedCompanyNames.map((company, i) => (
        <option key={i} value={company}>
          {company}
        </option>
      ))}
    </Select>
  );
}
