import { useDispatch, useSelector } from "react-redux";
import { ModalState } from "@tgs-web-nx/types";
import { CLOSE_MODAL, SHOW_MODAL } from "@tgs-web-nx/core";

export function useModalStore() {
  const dispatch = useDispatch();

  //@ts-ignore
  const modal: ModalState = useSelector((state) => state.modal);

  const showModal = async () => {
    dispatch({
      type: SHOW_MODAL,
    });
  };

  const closeModal = async () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  return {
    modal,
    showModal,
    closeModal,
  };
}
