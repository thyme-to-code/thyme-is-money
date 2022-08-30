// @ts-check
import React from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import {
  MdHome,
  MdMenu,
  MdOutlineLogout,
  MdOutlineTextSnippet,
  MdPersonAdd,
} from "react-icons/md";

import { clearSelectedClient } from "../reducers/clients";

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
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<MdHome />} onClick={showSummary}>
          Home
        </MenuItem>
        <MenuItem
          icon={<MdPersonAdd />}
          // bg="brand.100"
          // mb={3}
          // color="brand.50"
          // _hover={{ bg: "brand.200" }}
        >
          Add Client
        </MenuItem>
        <MenuItem icon={<MdOutlineTextSnippet />}>Download CSV</MenuItem>
        <MenuItem icon={<MdOutlineLogout />} onClick={handleLogOut}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Flex>
      <Box>
        <HStack>
          <Image
            onClick={showSummary}
            boxSize="64px"
            alt="Two leaves as logo"
            src="/favicon-crop.png"
          />
          <Spacer px="1" />
          <Heading onClick={showSummary} as="h1" color="#fff">
            Thyme is Money
          </Heading>
        </HStack>
      </Box>
      <Spacer />
      <Box mr={3}>
        {menu}
        {/* <Button colorScheme="whiteAlpha" onClick={handleLogOut}>
          Log Out
        </Button> */}
      </Box>
    </Flex>
  );
}
