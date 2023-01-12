import React from "react";
import { useAppSelector, useAppDispatch } from "../../reducers/hooks";
import { Box, Select, Stack } from "@chakra-ui/react";
import { setSelectedClient, clearSelectedClient } from "../../reducers/clients";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

import { EditClient } from "./EditClient";

export function ClientSelector() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients);

  const orderedCompanyNames = clients.active
    .map((client) => client.business_name)
    .sort();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const myClient = clients.active.find(
      (client) => client.business_name == e.target.value
    );
    myClient ? dispatch(setSelectedClient(myClient)) 
      : dispatch(clearSelectedClient());
  }

  if (clients.loading) {
    return <>Loading ...</>;
  }

  return (
    <>
      <Box bg="brand.100" borderRadius="lg" color="brand.50">
        <Stack direction="row">
          {clients.selected.id && <EditClient />}
          <Select
            icon={<MdOutlineArrowDropDownCircle />}
            iconSize={'50'}
            onChange={handleChange}
            size="lg"
            p="0px"
            placeholder="Select a client"
            borderColor="brand.100"
            _hover={{ color: "brand.500" }}
            style={{
              fontSize: "1.4em",
              fontWeight: "600",
            }}
            value={clients.selected?.business_name || ""}
          >
            {orderedCompanyNames.map((company, i) => (
              <option key={i} value={company}>
                {company}
              </option>
            ))}
          </Select>
        </Stack>
      </Box>
    </>
  );
}
