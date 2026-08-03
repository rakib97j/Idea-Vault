import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const CommentDeleteAlert = ({ cid }) => {
  const CDID = cid;

  const handelDelete = async () => {
     const {data:tokenData} =  await authClient.token()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/${CDID}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization : `Bearer ${tokenData?.token}`
        },
      },
    );
    const data = await res.json();
    if (res.ok) {
    toast.success("Comment deleted successfully!");
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } else {
    toast.error("Failed to delete comment!");
  }
  };

  return (
    <AlertDialog>
      <Button
        className="p-0 text-[11px] font-semibold text-red-500 hover:text-red-400 hover:underline transition-all cursor-pointer"
        variant="flat"
      >
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-[var(--background)]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Comment ?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>your comment</strong>{" "}
                
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
             
              <Button onClick={handelDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CommentDeleteAlert;
