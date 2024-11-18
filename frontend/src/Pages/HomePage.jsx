import { Container, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack>
        <Text
          fontSize="2xl"
          fontWeight={'bold'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products 🚀
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          w={'full'}
          gap={'24px'}
        >
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </SimpleGrid>
        {products.length === 0 && (
          <HStack>
            <Text
              fontSize={'30'}
              fontWeight={'bold'}
              color={'gray.500'}
              textAlign={'center'}
            >
              No Products Found 😢
            </Text>
            <Link to={'/create'}>
              <Text
                as={'span'}
                color={'blue.500'}
                _hover={{ textDecoration: 'underline' }}
              >
                Create a Product
              </Text>
            </Link>
          </HStack>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
