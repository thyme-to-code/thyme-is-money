import React from "react";
import { MenuItem } from "@chakra-ui/react";

import { MdPersonAdd } from "react-icons/md";

export function AddClient() {
  return (
    <>
      <MenuItem
        icon={<MdPersonAdd />}
        // bg="brand.100"
        // mb={3}
        // color="brand.50"
        // _hover={{ bg: "brand.200" }}
      >
        Add Client
      </MenuItem>
    </>
  );
}
