import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Heading,
  IconButton,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import {
  MdDeleteForever,
  MdAttachMoney,
  MdHourglassBottom,
} from "react-icons/md";

import { getUninvoicedItems } from "../../reducers/items";

// TODO Update to be items
import { deleteTask } from "../../apis/tasks";
import { EditTask } from "./EditTask";

export function Tasks() {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.clients);
  const items = useSelector((state) => state.items);

  function handleDelete(id) {
    deleteTask(id);
    dispatch(getUninvoicedItems());
  }

  if (items.loading) {
    return <>Loading ...</>;
  }

  const itemCards = (
    // <Wrap justify="flex-start" align="center}">
    <SimpleGrid minChildWidth="330px" spacing="40px">
      {items?.uninvoiced.map((item) => {
        if (item.client_id === selected.id) {
          return (
            <Box
              key={item.id}
              pt="4"
              pb="6"
              pr="9"
              pl="9"
              bg="#eaf9f6"
              borderRadius="lg"
            >
              <Stack direction={"column"} spacing="3px">
                <Heading mb={5} as="h2" size="sm" pt={2}>
                  {item.description}
                </Heading>
                <Grid templateColumns="repeat(4, 1fr)" gap={6} mt="auto">
                  <GridItem>
                    <Tag p={1} variant="ghost" fontSize="2xl">
                      <TagLeftIcon
                        boxSize="24px"
                        as={MdHourglassBottom}
                        color={"brand.100"}
                      />
                      <TagLabel>{item.quantity}</TagLabel>
                    </Tag>
                  </GridItem>
                  <GridItem>
                    <Tag p={1} variant="ghost" fontSize="2xl">
                      <TagLeftIcon
                        boxSize="24px"
                        as={MdAttachMoney}
                        color={"brand.100"}
                      />
                      <TagLabel>
                        {(item.quantity * selected.rate).toLocaleString(
                          "en-US"
                        )}
                      </TagLabel>
                    </Tag>
                  </GridItem>
                  <GridItem>
                    <EditTask value={{ item }} />
                  </GridItem>
                  <GridItem>
                    <IconButton
                      fontSize="1.4em"
                      size="md"
                      bg="brand.400"
                      color="brand.50"
                      _hover={{ bg: "brand.500" }}
                      id={item.id}
                      value={item.id}
                      onClick={() => handleDelete(item.id)}
                      icon={<MdDeleteForever />}
                      aria-label={"button"}
                    />
                  </GridItem>
                </Grid>
              </Stack>
            </Box>
          );
        }
      })}
    </SimpleGrid>
  );

  return <div className="tasks">{itemCards}</div>;
}
