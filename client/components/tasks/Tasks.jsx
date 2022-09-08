import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  IconButton,
  Flex,
  SimpleGrid,
  Spacer,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdDeleteForever,
  MdAttachMoney,
  MdHourglassBottom,
} from "react-icons/md";

// import { getUninvoicedItems } from "../../reducers/items";

// TODO Update to be items
// import { deleteTask } from "../../apis/tasks";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";

export function Tasks() {
  // const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.clients);
  const items = useSelector((state) => state.items);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = React.useRef();

  // function handleDelete(id) {
  //   onOpen();
  //   deleteTask(id);
  //   dispatch(getUninvoicedItems());
  //   onClose();
  // }

  if (items.loading) {
    return <>Loading ...</>;
  }

  const itemCards = (
    // <Wrap justify="flex-start" align="center}">
    <SimpleGrid minChildWidth="260px" spacing="11px">
      {items?.uninvoiced.map((item) => {
        if (item.client_id === selected.id) {
          return (
            <Flex
              bg="brand.300"
              borderBottomRadius="lg"
              borderColor={"brand.200"}
              borderWidth={2}
              direction="column"
              key={item.id}
            >
              <Text p={3}> {item.description}</Text>
              <Spacer />
              <Flex bg={"brand.200"} borderBottomRadius="lg" direction="row">
                <EditTask value={{ item }} />
                <Spacer />
                <Tag p={1} variant="ghost" fontSize="2xl">
                  <TagLeftIcon as={MdHourglassBottom} color={"brand.50"} />
                  <TagLabel color="brand.50">{item.quantity} </TagLabel>
                </Tag>
                <Spacer />
                <Tag p={1} variant="ghost" fontSize="2xl">
                  <TagLeftIcon
                    boxSize="24px"
                    as={MdAttachMoney}
                    color="brand.50"
                  />
                  <TagLabel color="brand.50">
                    {(item.quantity * selected.rate).toLocaleString("en-US")}
                  </TagLabel>
                </Tag>
                <Spacer />
                <DeleteTask itemId={item.id} />
              </Flex>
            </Flex>
          );
        }
      })}
    </SimpleGrid>
  );

  return <div className="tasks">{itemCards}</div>;
}
