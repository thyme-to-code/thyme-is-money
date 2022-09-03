import React from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { MdHome, MdMenu, MdOutlineLogout } from "react-icons/md";

import { clearSelectedClient } from "../reducers/clients";

import { NewClient } from "./clients/NewClient";
import { InvoiceCsv } from "./invoices/InvoiceCsv";

export function Header() {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  function handleLogOut(event) {
    event.preventDefault();
    localStorage.clear();
    logout();
  }

  function showSummary() {
    dispatch(clearSelectedClient());
  }

  const menu = (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MdMenu />}
        variant="flush"
        fontSize={"xx-large"}
        color="brand.50"
        _hover={{ bg: "brand.100" }}
        _active={{ bg: "brand.200" }}
      />
      <MenuList>
        <MenuItem color="brand.200" icon={<MdHome />} onClick={showSummary}>
          Home
        </MenuItem>
        <NewClient />
        <InvoiceCsv />
        <MenuItem
          color="brand.200"
          icon={<MdOutlineLogout />}
          onClick={handleLogOut}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Box bg="brand.200" p={3}>
      <Stack direction="row">
        <Image
          onClick={showSummary}
          boxSize="42px"
          alt="Two leaves as logo"
          src="/favicon-crop.png"
        />
        <Spacer px="1" />
        <Heading onClick={showSummary} as="h1" fontSize="1.5em" color="#fff">
          Thyme is Money
        </Heading>
        <Spacer />
        {menu}
        {/* <Button colorScheme="whiteAlpha" onClick={handleLogOut}>
          Log Out
        </Button> */}
      </Stack>
    </Box>
  );
}
