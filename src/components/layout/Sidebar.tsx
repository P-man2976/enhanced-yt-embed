import * as Dialog from '@radix-ui/react-dialog';
import { HStack, Heading, Text, VStack, css } from '@kuma-ui/core';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons/lib';
import { TbPlaylist } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { Icon } from '../common';
import { AnimatePresence } from 'framer-motion';
import { BsChevronCompactRight } from 'react-icons/bs';
import { useBoolean } from 'usehooks-ts';

const sidebarItems = [
  {
    icon: TbPlaylist,
    title: 'Playlist',
  },
];

export function SidebarDrawer() {
  const { value, toggle } = useBoolean();

  return (
    <Dialog.Root onOpenChange={toggle}>
      <Dialog.Trigger>
        <HStack
          display={['none', 'flex']}
          position="fixed"
          top="0"
          left="0"
          bottom="0"
          alignItems="center"
        >
          <Icon icon={BsChevronCompactRight} height="3rem" width="3rem" />
        </HStack>
      </Dialog.Trigger>
      <AnimatePresence>
        {value && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay>
              <motion.div
                className={css`
                  position: fixed;
                  inset: 0;
                  background-color: rgba(0, 0, 0, 0.4);
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                }}
              />
            </Dialog.Overlay>
            <Dialog.Content>
              <motion.div
                className={css`
                  position: fixed;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  backdrop-filter: blur(8px);
                `}
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.2, type: 'ease' }}
              >
                <SidebarContent />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export function SidebarHeading() {
  return (
    <HStack>
      <Heading
        color="colors.slate.50"
        fontFamily="Outfit"
        fontWeight="bold"
        fontSize="1.5rem"
      >
        Enhanced YouTube Embed
      </Heading>
    </HStack>
  );
}

export function SidebarContent() {
  return (
    <VStack width="100%" px="1rem" py="2rem" gap="2rem">
      <SidebarHeading />
      <VStack width="100%">
        {sidebarItems.map((props) => (
          <SidebarItem key={props.title} {...props} />
        ))}
      </VStack>
    </VStack>
  );
}

function SidebarItem({ icon, title }: { icon: IconType; title: string }) {
  const { t } = useTranslation();

  return (
    <HStack
      minWidth="24rem"
      width="100%"
      color="white"
      p="1rem"
      borderRadius="0.5rem"
      alignItems="center"
      _hover={{
        bg: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <Icon icon={icon} width="2rem" height="2rem" />
      <Text fontSize="1.5rem" fontWeight="bold">
        {t(title)}
      </Text>
    </HStack>
  );
}
