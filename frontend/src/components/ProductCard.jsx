/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '../store/product';
import { Toaster, toaster } from '../components/ui/toaster';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const { deleteProduct, updateProduct } = useProductStore();

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toaster.create({
        title: 'Error',
        description: message,
        type: 'error',
      });
    } else {
      toaster.create({
        title: 'Success',
        description: message,
        type: 'success',
      });
    }
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    if (success) {
      toaster.create({
        title: 'Success',
        description: 'Product updated successfully!',
        type: 'success',
      });

      toaster.create({
        title: 'Error',
        description: message || 'Failed to update product.',
        type: 'error',
      });
    }
  };

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'transform 0.3s ease-in-out'}
      _hover={{ transform: 'translateY(5px)', shadow: 'xl' }}
      bg={bg}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
    >
      <Toaster />

      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />
      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} mb={4} color={textColor}>
          ${product.price}
        </Text>
        <HStack>
          <HStack>
            <DialogRoot
              key={'sm'}
              size={'sm'}
              placement={'center'}
              motionPreset={'scale'}
            >
              <DialogTrigger asChild>
                <FaRegEdit color="blue" size={'1.5rem'} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <VStack wordSpacing={4}>
                    <Input
                      placeholder="Product Name"
                      name="name"
                      type="text"
                      value={updatedProduct.name}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Price"
                      name="price"
                      type="number"
                      value={updatedProduct.price}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Image URL"
                      name="image"
                      type="text"
                      value={updatedProduct.image}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          image: e.target.value,
                        })
                      }
                    />
                  </VStack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Save
                  </Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </HStack>
          <MdDeleteOutline
            color="red"
            size={'1.5rem'}
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
