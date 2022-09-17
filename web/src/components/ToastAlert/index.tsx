import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

interface Props {
  showToast: boolean;
}
export function ToastAlert(props: Props) {
  const [openToast, setOpenToast] = useState(false);
  const { showToast } = props;
  function handleCloseToast() {
    setOpenToast(false);
  }

  useEffect(() => {
    setOpenToast(showToast);
  }, [showToast]);
  return (
    <>
      <Toast.Root open={openToast} onOpenChange={handleCloseToast}>
        <Toast.Title>Um titulo aqui</Toast.Title>
        <Toast.Description>Uma descrição aqui</Toast.Description>
        <Toast.Action altText="">Um texto aqui</Toast.Action>
        <Toast.Close />
      </Toast.Root>

      <Toast.Viewport />
    </>
  );
}
