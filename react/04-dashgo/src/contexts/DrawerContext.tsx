import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useDisclosure, UseDisclosureProps } from '@chakra-ui/react';

interface DrawerProviderProps {
  children: ReactNode;
}

const DrawerContext = createContext({} as UseDisclosureProps);

export default function DrawerProvider({ children }: DrawerProviderProps) {
  const router = useRouter();
  const disclosure = useDisclosure();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <DrawerContext.Provider value={disclosure}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  return useContext(DrawerContext);
}
