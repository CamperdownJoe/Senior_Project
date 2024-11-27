"use client";

import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { useAuthModal } from "@/components/modals/auth-modal";

export const ModalContext = createContext<{
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowAuthModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { AuthModal, setShowAuthModal } = useAuthModal();

  return (
    <ModalContext.Provider
      value={{
        setShowAuthModal,
      }}
    >
      <AuthModal />
      {children}
    </ModalContext.Provider>
  );
}