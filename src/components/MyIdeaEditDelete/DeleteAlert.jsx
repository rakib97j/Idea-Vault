"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";



export function DeleteAlert({ data }) {
  const cardData = data;

  
 

  const handelDelete = async () =>{

    const {data:tokenData} =  await authClient.token()



    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${cardData._id}` ,
        {
            method: "DELETE",
            headers:{
                "content-type" : "application/json",
                authorization : `Bearer ${tokenData?.token}`

            }
        })
        const data = await res.json();
         toast.error("Idea Deletesuccessfully!");
       window.location.reload()
  }

  return (
    <AlertDialog>
      <Button  variant="danger">
        <Trash2 className="w-4 h-4" />{" "}
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-[var(--background)]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Idea permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Idea</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handelDelete} slot="close" variant="danger">
                Delete Idea
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
