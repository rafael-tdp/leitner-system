import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { Flex } from '@chakra-ui/react';
import './App.css'

function App() {

  return (
    <Flex flexDir="column" h={'full'}>
      <Header />
      <Outlet />
    </Flex>
  )
}

export default App
