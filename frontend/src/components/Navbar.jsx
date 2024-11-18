import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { LuMoon, LuPlusSquare, LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useColorMode } from './ui/color-mode';
function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={{ base: 'column', sm: 'row' }}
      >
        <Text
          fontSize={{ base: 'xl', sm: '3xl' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
        >
          <Link to={'/'}>Product Store 🛒</Link>
        </Text>
        <HStack letterSpacing={2} alignItems={'center'}>
          <Link to={'/create'}>
            <Button>
              <LuPlusSquare />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <LuMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
