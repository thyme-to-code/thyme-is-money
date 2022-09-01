import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Heading,
  IconButton,
  Grid,
  GridItem,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  MdDeleteForever,
  MdTaskAlt,
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
    <Wrap>
      {items?.uninvoiced.map((item) => {
        if (item.client_id === selected.id) {
          return (
            <WrapItem
              key={item.id}
              p="2"
              borderColor={"brand.200"}
              borderWidth="2px"
              borderRadius="lg"
              w="24%"
            >
              <Stack direction={"column"} spacing="3px">
                <Heading mb={2} as="h2" size="sm">
                  {item.description}
                </Heading>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                  <GridItem>
                    <Tag p={1} variant="outline" fontSize="2xl">
                      <TagLeftIcon boxSize="24px" as={MdHourglassBottom} />
                      <TagLabel>{item.quantity}</TagLabel>
                    </Tag>
                  </GridItem>
                  <GridItem>
                    <Tag p={1} variant="outline" fontSize="2xl">
                      <TagLeftIcon boxSize="24px" as={MdAttachMoney} />
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
            </WrapItem>
          );
        }
      })}
    </Wrap>
  );

  const itemTable = (
    <TableContainer mr={5}>
      <Table p="1" variant="striped" colorScheme="table">
        {selected.business_name && (
          <Thead color="brand.100">
            <Tr>
              <Td py="1">
                <Heading as="h3" size="md">
                  Uninvoiced Tasks
                </Heading>
              </Td>
              <Td py="1" isNumeric={true}>
                <Heading as="h3" size="md">
                  Hours
                </Heading>
              </Td>
              <Td py="1" isNumeric={true}>
                <Heading as="h3" size="md">
                  Amount
                </Heading>
              </Td>
              <Td px={2} py="1" isNumeric={true}></Td>
            </Tr>
          </Thead>
        )}

        {items?.uninvoiced.length > 0 ? (
          <Tbody>
            {items?.uninvoiced.map((item) => {
              if (item.client_id === selected.id) {
                return (
                  <Tr key={item.id}>
                    <Td py="1">{item.description}</Td>
                    <Td py="1" isNumeric={true}>
                      {item.quantity}
                    </Td>
                    <Td py="1" isNumeric={true}>
                      ${(item.quantity * selected.rate).toLocaleString("en-US")}
                    </Td>
                    <Td px="2" py="1" isNumeric={true}>
                      <EditTask value={{ item }} />
                      <IconButton
                        fontSize="1.4em"
                        size="sm"
                        bg="brand.400"
                        color="brand.50"
                        _hover={{ bg: "brand.500" }}
                        id={item.id}
                        value={item.id}
                        onClick={() => handleDelete(item.id)}
                        icon={<MdDeleteForever />}
                      />
                    </Td>
                  </Tr>
                );
              }
            })}
          </Tbody>
        ) : (
          <Tbody>
            <Tr key="dafe">
              <Td py="3.5">No tasks. Do some Work!</Td>
              <Td py="3.5"></Td>
              <Td py="3.5"></Td>
              <Td py="3.5"></Td>
            </Tr>
          </Tbody>
        )}
      </Table>
    </TableContainer>
  );

  return <div className="tasks">{itemCards}</div>;
}
